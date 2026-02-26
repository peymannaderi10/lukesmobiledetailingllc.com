"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import {
  SERVICES,
  VEHICLES,
  CONDITIONS,
  ADDONS,
  calculateQuote,
} from "@/lib/pricing";
import type {
  ServiceKey,
  VehicleKey,
  ConditionKey,
  AddonKey,
} from "@/lib/pricing";

/* ------------------------------------------------------------------ */
/*  Types & helpers                                                     */
/* ------------------------------------------------------------------ */

interface TimeSlot {
  startAt: string;
  teamMemberId: string;
  serviceVariationVersion: string;
  durationMinutes: number;
}

interface BookingResult {
  id: string;
  startAt: string;
  status: string;
}

type ViewMode = "week" | "month";

const TOTAL_STEPS = 6;

function fmtDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  const diff = day === 0 ? 1 : day === 1 ? 0 : -(day - 1);
  date.setDate(date.getDate() + diff);
  return date;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/* ------------------------------------------------------------------ */
/*  Month Calendar (for month view)                                     */
/* ------------------------------------------------------------------ */

function MonthCalendar({
  selectedDate,
  onSelectDate,
  onMonthChange,
}: {
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
  onMonthChange: (startDate: string, endDate: string) => void;
}) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  useEffect(() => {
    const first = fmtDateKey(new Date(year, month, 1));
    const last = fmtDateKey(new Date(year, month + 1, 0));
    onMonthChange(first, last);
  }, [year, month, onMonthChange]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const blanks: null[] = Array(firstDow).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const canGoPrev = new Date(year, month, 1) > today;
  const canGoNext =
    new Date(year, month + 1, 1) <
    new Date(today.getFullYear(), today.getMonth() + 3, 1);

  const isDisabled = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    return d < today || d.getDay() === 0;
  };

  const fmtDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() =>
            canGoPrev && setViewDate(new Date(year, month - 1, 1))
          }
          disabled={!canGoPrev}
          className={`p-1.5 rounded-full ${canGoPrev ? "hover:bg-gray-200 text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="font-bold text-gray-800 not-italic">{monthLabel}</span>
        <button
          type="button"
          onClick={() =>
            canGoNext && setViewDate(new Date(year, month + 1, 1))
          }
          disabled={!canGoNext}
          className={`p-1.5 rounded-full ${canGoNext ? "hover:bg-gray-200 text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-xs text-gray-500 font-medium py-2 not-italic"
          >
            {d}
          </div>
        ))}

        {blanks.map((_, i) => (
          <div key={`b${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = fmtDate(day);
          const disabled = isDisabled(day);
          const selected = dateStr === selectedDate;
          const isToday =
            new Date(year, month, day).getTime() === today.getTime();

          return (
            <button
              type="button"
              key={day}
              onClick={() => !disabled && onSelectDate(dateStr)}
              disabled={disabled}
              className={[
                "py-2 rounded text-sm font-medium transition-colors not-italic",
                disabled && "text-gray-300 cursor-not-allowed",
                selected && "bg-primary text-white",
                !selected && !disabled && "hover:bg-gray-200 text-gray-800",
                isToday && !selected && "ring-1 ring-primary",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Booking Form                                                  */
/* ------------------------------------------------------------------ */

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") as ServiceKey | null;

  // --- form state ------------------------------------------------
  const [step, setStep] = useState(1);
  const [serviceKey, setServiceKey] = useState<ServiceKey | null>(null);
  const [vehicleKey, setVehicleKey] = useState<VehicleKey | null>(null);
  const [conditionKey, setConditionKey] = useState<ConditionKey | null>(null);
  const [addonKeys, setAddonKeys] = useState<AddonKey[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [carColor, setCarColor] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");

  // --- scheduling state ------------------------------------------
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [slotsByDate, setSlotsByDate] = useState<Record<string, TimeSlot[]>>(
    {}
  );
  const [loadingRange, setLoadingRange] = useState(false);
  const [rangeError, setRangeError] = useState<string | null>(null);

  // --- other UI state --------------------------------------------
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(
    null
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // --- preselect from query param --------------------------------
  useEffect(() => {
    if (preselectedService && preselectedService in SERVICES) {
      setServiceKey(preselectedService);
      setStep(2);
    }
  }, [preselectedService]);

  // --- track which service we already preloaded ------------------
  const preloadedServiceRef = useRef<string | null>(null);
  const fetchedRangesRef = useRef<Set<string>>(new Set());

  // --- reset slots when service changes --------------------------
  useEffect(() => {
    setSlotsByDate({});
    setSelectedDate(null);
    setSelectedSlot(null);
    preloadedServiceRef.current = null;
    fetchedRangesRef.current.clear();
  }, [serviceKey]);

  // --- quote calculation -----------------------------------------
  const quote = useMemo(() => {
    if (!serviceKey || !vehicleKey || !conditionKey) return null;
    return calculateQuote({ serviceKey, vehicleKey, conditionKey, addonKeys });
  }, [serviceKey, vehicleKey, conditionKey, addonKeys]);

  // --- range-based availability fetch ----------------------------
  const parseSlots = useCallback(
    (data: { availabilities?: Record<string, unknown>[] }) => {
      const grouped: Record<string, TimeSlot[]> = {};
      for (const a of data.availabilities ?? []) {
        const segs = a.appointmentSegments as
          | Record<string, unknown>[]
          | undefined;
        const seg = segs?.[0] ?? {};
        const slot: TimeSlot = {
          startAt: String(a.startAt ?? ""),
          teamMemberId: String(seg.teamMemberId ?? ""),
          serviceVariationVersion: String(
            seg.serviceVariationVersion ?? ""
          ),
          durationMinutes: Number(seg.durationMinutes ?? 0),
        };
        const dateKey = new Date(slot.startAt).toLocaleDateString("en-CA", {
          timeZone: "America/Los_Angeles",
        });
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(slot);
      }
      return grouped;
    },
    []
  );

  const fetchRangeQuiet = useCallback(
    async (service: ServiceKey, startDate: string, endDate: string) => {
      const key = `${startDate}|${endDate}`;
      if (fetchedRangesRef.current.has(key)) return;
      fetchedRangesRef.current.add(key);
      try {
        const res = await fetch(
          `/api/availability?service=${service}&startDate=${startDate}&endDate=${endDate}`
        );
        const data = await res.json();
        if (!res.ok) return;
        setSlotsByDate((prev) => ({ ...prev, ...parseSlots(data) }));
      } catch {
        fetchedRangesRef.current.delete(key);
      }
    },
    [parseSlots]
  );

  const fetchRange = useCallback(
    async (startDate: string, endDate: string) => {
      if (!serviceKey) return;
      const key = `${startDate}|${endDate}`;
      if (fetchedRangesRef.current.has(key)) return;
      fetchedRangesRef.current.add(key);
      setLoadingRange(true);
      setRangeError(null);

      try {
        const res = await fetch(
          `/api/availability?service=${serviceKey}&startDate=${startDate}&endDate=${endDate}`
        );
        const data = await res.json();

        if (!res.ok) {
          fetchedRangesRef.current.delete(key);
          setRangeError(data.error || "Failed to load availability");
          return;
        }

        setSlotsByDate((prev) => ({ ...prev, ...parseSlots(data) }));
      } catch {
        fetchedRangesRef.current.delete(key);
        setRangeError("Could not connect to the server. Please try again.");
      } finally {
        setLoadingRange(false);
      }
    },
    [serviceKey, parseSlots]
  );

  // --- preload current week + month once after service is picked --
  useEffect(() => {
    if (step < 3 || !serviceKey) return;
    if (preloadedServiceRef.current === serviceKey) return;
    preloadedServiceRef.current = serviceKey;

    const now = new Date();
    const ws = getMonday(now);
    const weekStartStr = fmtDateKey(ws);
    const weekEndStr = fmtDateKey(addDays(ws, 5));
    const monthStartStr = fmtDateKey(new Date(now.getFullYear(), now.getMonth(), 1));
    const monthEndStr = fmtDateKey(new Date(now.getFullYear(), now.getMonth() + 1, 0));

    fetchRangeQuiet(serviceKey, weekStartStr, weekEndStr);
    fetchRangeQuiet(serviceKey, monthStartStr, monthEndStr);
  }, [step, serviceKey, fetchRangeQuiet]);

  // --- week view: fetch when weekStart changes -------------------
  useEffect(() => {
    if (step !== 5 || !serviceKey || viewMode !== "week") return;
    const start = fmtDateKey(weekStart);
    const end = fmtDateKey(addDays(weekStart, 5));
    fetchRange(start, end);
  }, [step, serviceKey, viewMode, weekStart, fetchRange]);

  // --- when a date is selected, derive its slots -----------------
  const slotsForSelectedDate = useMemo(
    () => (selectedDate ? slotsByDate[selectedDate] ?? [] : []),
    [selectedDate, slotsByDate]
  );

  // --- navigation helpers ----------------------------------------
  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return !!serviceKey;
      case 2:
        return !!vehicleKey;
      case 3:
        return !!conditionKey;
      case 4:
        return true;
      case 5:
        return !!selectedSlot;
      default:
        return false;
    }
  }, [step, serviceKey, vehicleKey, conditionKey, selectedSlot]);

  const goNext = () => {
    if (step < TOTAL_STEPS && canContinue) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setFieldErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleAddon = (key: AddonKey) => {
    setAddonKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // --- form submission -------------------------------------------
  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email address";
    if (!phone.trim()) errs.phone = "Phone number is required";
    if (!carInfo.trim()) errs.carInfo = "Vehicle info is required";
    if (!carColor.trim()) errs.carColor = "Car color is required";

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceKey,
          vehicleKey,
          conditionKey,
          addonKeys,
          carInfo: carInfo.trim(),
          carColor: carColor.trim(),
          startAt: selectedSlot!.startAt,
          serviceVariationVersion: selectedSlot!.serviceVariationVersion,
          teamMemberId: selectedSlot!.teamMemberId,
          serviceAddress: serviceAddress.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(
          data.error || "Failed to create booking. Please try again."
        );
        return;
      }

      setBookingResult(data.booking);
      setIsComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- display helpers -------------------------------------------
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Los_Angeles",
    });

  const formatDateDisplay = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ================================================================ */
  /*  CONFIRMATION                                                     */
  /* ================================================================ */

  if (isComplete && bookingResult) {
    return (
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 not-italic">
            Booking Request Received
          </h2>
          <p className="text-gray-700 mb-6 not-italic font-normal">
            Thank you, {firstName}! Your detailing appointment has been
            submitted. We will contact you within 24 hours to confirm your
            appointment.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
            <h3 className="font-bold mb-3 text-lg text-gray-900 not-italic">
              Booking Details
            </h3>
            <dl className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt className="font-medium">Service</dt>
                <dd>{SERVICES[serviceKey!].name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Vehicle</dt>
                <dd>
                  {carInfo} ({carColor})
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Date</dt>
                <dd>
                  {selectedDate && formatDateDisplay(selectedDate)} at{" "}
                  {formatTime(bookingResult.startAt)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Estimated Total</dt>
                <dd className="font-bold text-primary">${quote?.totalPrice}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Estimated Duration</dt>
                <dd>{quote?.durationHours} hours</dd>
              </div>
            </dl>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Payment will be collected on-site after your detail is complete.
          </p>
          <a href="/" className="btn-primary inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  STEP CONTENT RENDERERS                                           */
  /* ================================================================ */

  const inputClass = (field?: string) =>
    `w-full p-3 rounded-lg border-2 transition-colors focus:outline-none focus:border-primary text-gray-900 ${
      field && fieldErrors[field] ? "border-red-400" : "border-gray-200"
    }`;

  function renderStep1() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Service</h2>
        <p className="text-gray-600 mb-6 not-italic font-normal">
          Select the detailing package that is right for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            Object.entries(SERVICES) as [
              ServiceKey,
              (typeof SERVICES)[ServiceKey],
            ][]
          ).map(([key, svc]) => {
            const active = serviceKey === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setServiceKey(key)}
                className={`text-left p-5 rounded-lg border-2 transition-all ${
                  active
                    ? "border-primary bg-red-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg not-italic text-gray-900">
                    {svc.name}
                  </span>
                  {active && (
                    <CheckIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3 not-italic font-normal">
                  {svc.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-gray-500 not-italic font-normal">
                  <ClockIcon className="h-4 w-4" />~{svc.baseDuration} hours
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">What Type of Vehicle?</h2>
        <p className="text-gray-600 mb-6 not-italic font-normal">
          This helps us provide an accurate estimate.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(
            Object.entries(VEHICLES) as [
              VehicleKey,
              (typeof VEHICLES)[VehicleKey],
            ][]
          ).map(([key, v]) => {
            const active = vehicleKey === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setVehicleKey(key)}
                className={`p-4 rounded-lg border-2 transition-all text-center font-medium not-italic ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 hover:border-gray-300 text-gray-800"
                }`}
              >
                {v.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStep3() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Vehicle Condition</h2>
        <p className="text-gray-600 mb-6 not-italic font-normal">
          Be honest — it helps us prepare the right tools and time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(
            Object.entries(CONDITIONS) as [
              ConditionKey,
              (typeof CONDITIONS)[ConditionKey],
            ][]
          ).map(([key, c]) => {
            const active = conditionKey === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setConditionKey(key)}
                className={`text-left p-5 rounded-lg border-2 transition-all ${
                  active
                    ? "border-primary bg-red-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold not-italic text-gray-900">
                    {c.name}
                  </span>
                  {active && (
                    <CheckIcon className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 not-italic font-normal">
                  {c.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStep4() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Add-On Services</h2>
        <p className="text-gray-600 mb-6 not-italic font-normal">
          Optional extras — select as many as you like or skip this step.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            Object.entries(ADDONS) as [AddonKey, (typeof ADDONS)[AddonKey]][]
          ).map(([key, addon]) => {
            const active = addonKeys.includes(key);
            return (
              <button
                type="button"
                key={key}
                onClick={() => toggleAddon(key)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all text-left ${
                  active
                    ? "border-primary bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      active ? "bg-primary border-primary" : "border-gray-300"
                    }`}
                  >
                    {active && <CheckIcon className="h-3 w-3 text-white" />}
                  </span>
                  <span className="font-medium not-italic text-gray-900">
                    {addon.label}
                  </span>
                </span>
                <span
                  className={`font-bold text-sm not-italic ${
                    active ? "text-primary" : "text-gray-500"
                  }`}
                >
                  +${addon.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  STEP 5 — Date & Time picker                                      */
  /* ================================================================ */

  function handleSelectSlot(slot: TimeSlot) {
    const dateKey = new Date(slot.startAt).toLocaleDateString("en-CA", {
      timeZone: "America/Los_Angeles",
    });
    setSelectedDate(dateKey);
    setSelectedSlot(slot);
  }

  function renderWeekView() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekDays: Date[] = [];
    for (let i = 0; i < 6; i++) {
      weekDays.push(addDays(weekStart, i));
    }

    const canGoPrev = weekStart > today;
    const maxWeekStart = addDays(today, 12 * 7);
    const canGoNext = weekStart < maxWeekStart;

    const weekLabel = `${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekDays[5].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => canGoPrev && setWeekStart(addDays(weekStart, -7))}
            disabled={!canGoPrev}
            className={`p-1.5 rounded-full ${canGoPrev ? "hover:bg-gray-200 text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="font-bold text-gray-800 not-italic text-sm sm:text-base">
            {weekLabel}
          </span>
          <button
            type="button"
            onClick={() => canGoNext && setWeekStart(addDays(weekStart, 7))}
            disabled={!canGoNext}
            className={`p-1.5 rounded-full ${canGoNext ? "hover:bg-gray-200 text-gray-700" : "opacity-30 cursor-not-allowed text-gray-400"}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {loadingRange && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-gray-500 not-italic font-normal">
              Loading availability&hellip;
            </p>
          </div>
        )}

        {!loadingRange && rangeError && (
          <div className="text-center py-8 text-red-600">
            <p className="not-italic font-normal">{rangeError}</p>
            <button
              type="button"
              onClick={() => {
                const start = fmtDateKey(weekStart);
                const end = fmtDateKey(addDays(weekStart, 5));
                fetchRange(start, end);
              }}
              className="btn-outline mt-4 text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {!loadingRange && !rangeError && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {weekDays.map((day) => {
              const dateKey = fmtDateKey(day);
              const isPast = day < today;
              const isSunday = day.getDay() === 0;
              const disabled = isPast || isSunday;
              const daySlots = slotsByDate[dateKey] ?? [];
              const dayLabel = day.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dateLabel = day.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={dateKey}
                  className={`rounded-lg border p-3 ${disabled ? "opacity-40 bg-gray-50" : "bg-white border-gray-200"}`}
                >
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500 font-medium not-italic">
                      {dayLabel}
                    </div>
                    <div className="text-sm font-bold text-gray-900 not-italic">
                      {dateLabel}
                    </div>
                  </div>

                  {disabled && (
                    <p className="text-xs text-gray-400 text-center not-italic font-normal">
                      {isSunday ? "Closed" : "Past"}
                    </p>
                  )}

                  {!disabled && daySlots.length === 0 && (
                    <p className="text-xs text-gray-400 text-center not-italic font-normal">
                      No availability
                    </p>
                  )}

                  {!disabled && daySlots.length > 0 && (
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {daySlots.map((slot, i) => {
                        const active =
                          selectedSlot?.startAt === slot.startAt;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => handleSelectSlot(slot)}
                            className={`w-full py-1.5 px-2 rounded text-xs font-medium transition-all not-italic ${
                              active
                                ? "bg-primary text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            {formatTime(slot.startAt)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function renderMonthView() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthCalendar
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setSelectedSlot(null);
          }}
          onMonthChange={fetchRange}
        />

        <div>
          <h3 className="font-bold mb-3 text-gray-900 not-italic">
            {selectedDate ? "Available Times" : "Select a Date"}
          </h3>

          {!selectedDate && (
            <div className="text-gray-400 text-center py-12">
              <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="not-italic font-normal">
                Pick a date to see open times
              </p>
            </div>
          )}

          {selectedDate && loadingRange && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-500 not-italic font-normal">
                Loading available times&hellip;
              </p>
            </div>
          )}

          {selectedDate && !loadingRange && rangeError && (
            <div className="text-center py-8 text-red-600">
              <p className="not-italic font-normal">{rangeError}</p>
            </div>
          )}

          {selectedDate &&
            !loadingRange &&
            !rangeError &&
            slotsForSelectedDate.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="font-medium not-italic text-gray-700">
                  No available times on this date.
                </p>
                <p className="text-sm mt-1 not-italic font-normal">
                  Please try another day.
                </p>
              </div>
            )}

          {selectedDate &&
            !loadingRange &&
            !rangeError &&
            slotsForSelectedDate.length > 0 && (
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                {slotsForSelectedDate.map((slot, i) => {
                  const active = selectedSlot?.startAt === slot.startAt;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleSelectSlot(slot)}
                      className={`p-3 rounded-lg border-2 text-center font-medium text-sm transition-all not-italic ${
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-gray-300 text-gray-800"
                      }`}
                    >
                      {formatTime(slot.startAt)}
                    </button>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    );
  }

  function renderStep5() {
    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Pick a Date & Time</h2>
            <p className="text-gray-600 not-italic font-normal">
              Choose an available date and time for your appointment.
            </p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-1 self-start sm:self-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors not-italic ${
                viewMode === "week"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors not-italic ${
                viewMode === "month"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {viewMode === "week" && renderWeekView()}
        {viewMode === "month" && renderMonthView()}
      </div>
    );
  }

  function renderStep6() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Information</h2>
        <p className="text-gray-600 mb-6 not-italic font-normal">
          Complete your details to confirm the booking.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  First Name *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass("firstName")}
                  placeholder="John"
                />
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass("lastName")}
                  placeholder="Doe"
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass("email")}
                  placeholder="john@email.com"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass("phone")}
                  placeholder="(530) 555-1234"
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  Year / Make / Model *
                </label>
                <input
                  type="text"
                  value={carInfo}
                  onChange={(e) => setCarInfo(e.target.value)}
                  className={inputClass("carInfo")}
                  placeholder="2021 Tesla Model 3"
                />
                {fieldErrors.carInfo && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.carInfo}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                  Car Color *
                </label>
                <input
                  type="text"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  className={inputClass("carColor")}
                  placeholder="White"
                />
                {fieldErrors.carColor && (
                  <p className="text-red-500 text-xs mt-1 not-italic font-normal">
                    {fieldErrors.carColor}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 not-italic">
                Service Address & Notes
              </label>
              <textarea
                value={serviceAddress}
                onChange={(e) => setServiceAddress(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg border-2 border-gray-200 transition-colors focus:outline-none focus:border-primary text-gray-900"
                placeholder="Where should we come? Any special instructions?"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 lg:sticky lg:top-28">
              <h3 className="font-bold text-lg mb-4 not-italic text-gray-900">
                Booking Summary
              </h3>

              <dl className="space-y-3 text-sm text-gray-900">
                <div className="flex justify-between">
                  <dt className="text-gray-600 not-italic font-normal">
                    Service
                  </dt>
                  <dd className="font-medium not-italic text-gray-900">
                    {SERVICES[serviceKey!].name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 not-italic font-normal">
                    Vehicle
                  </dt>
                  <dd className="font-medium not-italic text-gray-900">
                    {VEHICLES[vehicleKey!].name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 not-italic font-normal">
                    Condition
                  </dt>
                  <dd className="font-medium not-italic text-gray-900">
                    {CONDITIONS[conditionKey!].name}
                  </dd>
                </div>

                {addonKeys.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 pt-3">
                      <dt className="text-gray-600 font-medium not-italic">
                        Add-Ons
                      </dt>
                    </div>
                    {addonKeys.map((key) => (
                      <div key={key} className="flex justify-between pl-3">
                        <dt className="text-gray-600 not-italic font-normal">
                          {ADDONS[key].label}
                        </dt>
                        <dd className="font-medium not-italic text-gray-900">
                          +${ADDONS[key].price}
                        </dd>
                      </div>
                    ))}
                  </>
                )}

                {selectedDate && selectedSlot && (
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <dt className="text-gray-600 not-italic font-normal">
                      Date & Time
                    </dt>
                    <dd className="font-medium text-right text-xs leading-relaxed not-italic text-gray-900">
                      {formatDateDisplay(selectedDate)}
                      <br />
                      {formatTime(selectedSlot.startAt)}
                    </dd>
                  </div>
                )}

                <div className="border-t-2 border-gray-300 pt-3 mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-600 not-italic font-normal">
                      Est. Duration
                    </dt>
                    <dd className="font-medium not-italic text-gray-900">
                      {quote?.durationHours} hrs
                    </dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="font-bold text-lg not-italic text-gray-900">
                      Total
                    </dt>
                    <dd className="font-bold text-2xl text-primary not-italic">
                      ${quote?.totalPrice}
                    </dd>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3 not-italic font-normal">
                  Payment collected on-site after service is complete.
                </p>
              </dl>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm not-italic font-normal">
            {submitError}
          </div>
        )}
      </div>
    );
  }

  /* ================================================================ */
  /*  MAIN RENDER                                                      */
  /* ================================================================ */

  return (
    <div className="container-custom max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const s = i + 1;
            const completed = s < step;
            const active = s === step;
            return (
              <div
                key={s}
                className="flex items-center flex-1 last:flex-none"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 transition-colors ${
                    completed || active
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {completed ? <CheckIcon className="h-4 w-4" /> : s}
                </div>
                {s < TOTAL_STEPS && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      s < step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-500 text-center not-italic font-normal">
          Step {step} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
      </div>

      {/* Running Total (visible after condition is selected) */}
      {quote && step >= 3 && step < 6 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex justify-between items-center">
          <span className="text-gray-600 font-medium not-italic">
            Estimated Total
          </span>
          <span className="text-xl font-bold text-primary not-italic">
            ${quote.totalPrice}
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="btn-outline flex items-center gap-2"
          >
            <ChevronLeftIcon className="h-4 w-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className={`btn-primary flex items-center gap-2 ${
              !canContinue ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Continue <ChevronRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`btn-primary flex items-center gap-2 px-8 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>
        )}
      </div>
    </div>
  );
}
