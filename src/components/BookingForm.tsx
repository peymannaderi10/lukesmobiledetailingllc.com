"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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

const SERVICE_IMAGES: Record<string, string> = {
  signature: "/Images/webPhotos/mobileServiceCard.jpg",
  diamond: "/Images/webPhotos/PremiumProductsCard.jpg",
  basic: "/Images/webPhotos/SatisfactionGuaranteedCard.jpg",
  fullinterior: "/Images/beforeAndAfter/passengerAfter.jpg",
  fullexterior: "/Images/webPhotos/Banner.jpg",
};

const VEHICLE_ICONS: Record<string, string> = {
  sedan: "directions_car",
  hatchback: "airport_shuttle",
  suv: "directions_bus",
  truck: "local_shipping",
  xl: "rv_hookup",
};

const ADDON_ICONS: Record<string, string> = {
  pethair: "pets",
  odor: "air",
  enginebay: "minor_crash",
  headlights: "lightbulb",
  scratch: "auto_fix_high",
  carpetshampoo: "cleaning_services",
  leather: "chair",
  dentrepair: "build",
  fullwax: "auto_fix_high",
  ceramicwindows: "format_paint",
  undercarriage: "car_crash",
};

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
/*  Month Calendar                                                      */
/* ------------------------------------------------------------------ */

function MonthCalendar({
  selectedDate,
  onSelectDate,
  onMonthChange,
  slotsByDate = {},
}: {
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
  onMonthChange: (startDate: string, endDate: string) => void;
  slotsByDate?: Record<string, TimeSlot[]>;
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
    <div className="bg-surface-dark border border-white/5 p-6 rounded-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() =>
            canGoPrev && setViewDate(new Date(year, month - 1, 1))
          }
          disabled={!canGoPrev}
          className={`p-1.5 ${canGoPrev ? "hover:bg-zinc-800 text-gray-400 hover:text-white" : "opacity-30 cursor-not-allowed text-gray-600"}`}
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <span className="font-display font-bold text-white text-lg">{monthLabel}</span>
        <button
          type="button"
          onClick={() =>
            canGoNext && setViewDate(new Date(year, month + 1, 1))
          }
          disabled={!canGoNext}
          className={`p-1.5 ${canGoNext ? "hover:bg-zinc-800 text-gray-400 hover:text-white" : "opacity-30 cursor-not-allowed text-gray-600"}`}
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-xs text-gray-500 font-bold uppercase tracking-widest py-2 not-italic"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => (
          <div key={`b${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = fmtDate(day);
          const disabled = isDisabled(day);
          const hasSlots = (slotsByDate[dateStr]?.length ?? 0) > 0;
          const noAvailability = !disabled && !hasSlots;
          const selected = dateStr === selectedDate;
          const isToday =
            new Date(year, month, day).getTime() === today.getTime();

          return (
            <button
              type="button"
              key={day}
              onClick={() => !disabled && hasSlots && onSelectDate(dateStr)}
              disabled={disabled || noAvailability}
              className={[
                "aspect-square flex flex-col items-center justify-center text-sm font-medium transition-all not-italic rounded-sm",
                disabled && "text-gray-700 cursor-not-allowed bg-zinc-900/20",
                noAvailability && "text-gray-600 cursor-not-allowed bg-zinc-900/30 border border-zinc-800/50 opacity-60",
                selected && "bg-white text-black font-black shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105 z-10",
                !selected && !disabled && !noAvailability && "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-gray-600 text-white cursor-pointer",
                isToday && !selected && !noAvailability && "ring-1 ring-primary",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day}
              {!disabled && !selected && hasSlots && (
                <span className="w-1 h-1 bg-green-500 rounded-full mt-1" />
              )}
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
  const prefilledVehicle = searchParams.get("vehicle");

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
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [serviceNotes, setServiceNotes] = useState("");

  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [slotsByDate, setSlotsByDate] = useState<Record<string, TimeSlot[]>>({});
  const [loadingRange, setLoadingRange] = useState(false);
  const [rangeError, setRangeError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService && preselectedService in SERVICES) {
      setServiceKey(preselectedService);
      setStep(2);
    }
    if (prefilledVehicle) {
      setCarInfo(prefilledVehicle);
    }
  }, [preselectedService, prefilledVehicle]);

  const preloadedServiceRef = useRef<string | null>(null);
  const fetchedRangesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setSlotsByDate({});
    setSelectedDate(null);
    setSelectedSlot(null);
    preloadedServiceRef.current = null;
    fetchedRangesRef.current.clear();
  }, [serviceKey]);

  const quote = useMemo(() => {
    if (!serviceKey || !vehicleKey || !conditionKey) return null;
    return calculateQuote({ serviceKey, vehicleKey, conditionKey, addonKeys });
  }, [serviceKey, vehicleKey, conditionKey, addonKeys]);

  const parseSlots = useCallback(
    (data: { availabilities?: Record<string, unknown>[] }) => {
      const grouped: Record<string, TimeSlot[]> = {};
      for (const a of data.availabilities ?? []) {
        const segs = a.appointmentSegments as Record<string, unknown>[] | undefined;
        const seg = segs?.[0] ?? {};
        const slot: TimeSlot = {
          startAt: String(a.startAt ?? ""),
          teamMemberId: String(seg.teamMemberId ?? ""),
          serviceVariationVersion: String(seg.serviceVariationVersion ?? ""),
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

  useEffect(() => {
    if (step !== 5 || !serviceKey || viewMode !== "week") return;
    const start = fmtDateKey(weekStart);
    const end = fmtDateKey(addDays(weekStart, 5));
    fetchRange(start, end);
  }, [step, serviceKey, viewMode, weekStart, fetchRange]);

  const slotsForSelectedDate = useMemo(
    () => (selectedDate ? slotsByDate[selectedDate] ?? [] : []),
    [selectedDate, slotsByDate]
  );

  const canContinue = useMemo(() => {
    switch (step) {
      case 1: return !!serviceKey;
      case 2: return !!vehicleKey;
      case 3: return !!conditionKey;
      case 4: return true;
      case 5: return !!selectedSlot;
      case 6:
        return !!(
          firstName.trim() &&
          lastName.trim() &&
          email.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
          phone.trim() &&
          carInfo.trim() &&
          carColor.trim() &&
          streetAddress.trim() &&
          city.trim() &&
          state.trim() &&
          zip.trim()
        );
      default: return false;
    }
  }, [step, serviceKey, vehicleKey, conditionKey, selectedSlot, firstName, lastName, email, phone, carInfo, carColor, streetAddress, city, state, zip]);

  const goNext = () => {
    if (step < TOTAL_STEPS && canContinue) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setFieldErrors({});
    }
  };

  const prevStepRef = useRef(step);
  useEffect(() => {
    if (prevStepRef.current !== step) {
      prevStepRef.current = step;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const toggleAddon = (key: AddonKey) => {
    setAddonKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

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
    if (!streetAddress.trim()) errs.streetAddress = "Street address is required";
    if (!city.trim()) errs.city = "City is required";
    if (!state.trim()) errs.state = "State is required";
    if (!zip.trim()) errs.zip = "Zip code is required";
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
          serviceAddress: [streetAddress, aptSuite, city, state, zip].filter(Boolean).join(", ").trim(),
          serviceNotes: serviceNotes.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Failed to create booking. Please try again.");
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
      <div className="relative flex items-center justify-center min-h-[60vh] px-6">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/Images/webPhotos/Banner.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
        </div>
        <div className="relative z-20 w-full max-w-3xl">
          <div className="glassmorphism p-10 md:p-16 rounded-sm border-t border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="inline-flex items-center justify-center text-primary mb-8">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white italic mb-4 leading-tight">
              Thank you, <span className="text-primary">{firstName}</span>!
            </h1>
            <p className="text-base sm:text-xl text-gray-300 font-light mb-8 sm:mb-12 max-w-2xl mx-auto">
              Your detail is booked. We&apos;ll contact you within 24 hours to confirm your appointment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left bg-black/40 p-5 sm:p-8 rounded-sm border border-white/5">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold not-italic">Date &amp; Time</p>
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <span className="font-medium text-sm not-italic">
                    {selectedDate && formatDateDisplay(selectedDate)} at{" "}
                    {formatTime(bookingResult.startAt)}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold not-italic">Package</p>
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-primary">stars</span>
                  <span className="font-medium text-sm not-italic">{SERVICES[serviceKey!].name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold not-italic">Estimate</p>
                <div className="flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span className="font-bold text-lg not-italic">${quote?.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
              <Link
                href="/"
                className="w-full md:w-auto px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary transition-all flex items-center justify-center gap-2"
              >
                Return Home
              </Link>
            </div>

            <div className="border-t border-white/5 pt-6">
              <p className="text-gray-500 text-xs flex items-center justify-center gap-2 not-italic">
                <span className="material-symbols-outlined text-primary text-sm">info</span>
                No payment needed now. We collect payment on-site after the job is done.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  Step Labels                                                       */
  /* ================================================================ */

  const stepLabels = ["Service", "Vehicle", "Condition", "Add-ons", "Date", "Info"];

  /* ================================================================ */
  /*  INPUT CLASS                                                       */
  /* ================================================================ */

  const inputClass = (field?: string) =>
    `w-full bg-black/40 border text-white placeholder-gray-600 focus:ring-primary focus:border-primary p-4 text-sm rounded-none transition-all hover:border-white/20 ${
      field && fieldErrors[field] ? "border-red-400" : "border-white/10"
    }`;

  /* ================================================================ */
  /*  STEP RENDERERS                                                    */
  /* ================================================================ */

  function renderStep1() {
    return (
      <div>
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold italic text-white mb-4">
            Choose Your Service
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {(
            Object.entries(SERVICES) as [ServiceKey, (typeof SERVICES)[ServiceKey]][]
          ).map(([key, svc]) => {
            const active = serviceKey === key;
            const imgSrc = SERVICE_IMAGES[key] || "/Images/webPhotos/Banner.jpg";
            return (
              <button
                type="button"
                key={key}
                onClick={() => setServiceKey(key)}
                className={`service-card group relative bg-zinc-900 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full text-left ${
                  active
                    ? "border-primary shadow-[0_0_20px_rgba(210,31,60,0.3)]"
                    : "border-zinc-800 hover:border-primary"
                }`}
              >
                {active && (
                  <div className="absolute top-0 right-0 p-3 z-20">
                    <div className="w-6 h-6 rounded-full bg-primary border-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xs">check</span>
                    </div>
                  </div>
                )}
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                  <Image
                    src={imgSrc}
                    alt={svc.name}
                    fill
                    className="service-image object-cover transition-transform duration-700"
                  />
                  {key === "signature" && (
                    <div className="absolute bottom-3 left-3 z-20 bg-primary/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm rounded-sm not-italic">
                      Best Value
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-display font-bold italic text-white mb-1 group-hover:text-primary transition-colors">
                    {svc.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3 text-gray-400 text-xs not-italic">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    ~{svc.baseDuration} Hours
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed flex-grow not-italic">
                    {svc.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white italic mb-4">
            Select Your Vehicle Size
          </h2>
          <p className="text-gray-400 text-sm max-w-xl not-italic">
            Pricing and duration vary based on vehicle size.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
          {(
            Object.entries(VEHICLES) as [VehicleKey, (typeof VEHICLES)[VehicleKey]][]
          ).map(([key, v]) => {
            const active = vehicleKey === key;
            const icon = VEHICLE_ICONS[key] || "directions_car";
            return (
              <button
                type="button"
                key={key}
                onClick={() => setVehicleKey(key)}
                className={`group cursor-pointer text-left card-glass p-8 rounded-sm border transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/30 hover:bg-zinc-900/80"
                } hover:transform hover:-translate-y-1`}
              >
                {active && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                )}
                <span className="material-symbols-outlined text-5xl mb-6 block text-gray-400 group-hover:text-white transition-colors">
                  {icon}
                </span>
                <h3 className="text-xl font-display font-bold italic text-white mb-3">
                  {v.name}
                </h3>
                <div className="w-8 h-0.5 bg-primary/50 mb-4" />
                <p className="text-sm text-gray-400 leading-relaxed font-light not-italic">
                  {key === "sedan" && "Cars, coupes, sports cars"}
                  {key === "hatchback" && "Wagons, hatchbacks"}
                  {key === "suv" && "Crossovers, mid-size SUVs"}
                  {key === "truck" && "Pickups, trucks"}
                  {key === "xl" && "Full-size SUVs, vans"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStep3() {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold italic text-white">
            Vehicle Condition
          </h2>
        </div>

        <div className="text-center mb-12">
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed not-italic">
            Honesty is key. Assessing your vehicle&apos;s condition accurately ensures we allocate the proper time and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {(
            Object.entries(CONDITIONS) as [ConditionKey, (typeof CONDITIONS)[ConditionKey]][]
          ).map(([key, c]) => {
            const active = conditionKey === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setConditionKey(key)}
                className={`group cursor-pointer text-left card-glass p-8 rounded-sm border transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/30 hover:bg-zinc-900/80"
                } hover:transform hover:-translate-y-1`}
              >
                {active && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                )}
                <h3 className="text-xl font-display font-bold italic text-white mb-3">
                  {c.name}
                </h3>
                <div className="w-8 h-0.5 bg-primary/50 mb-4" />
                <p className="text-sm text-gray-400 leading-relaxed font-light not-italic">
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
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white italic mb-4">
            Enhance Your Detail
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed not-italic">
            Select specialized treatments to address specific needs. These optional add-ons ensure your vehicle receives the exact level of care it requires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {(
            Object.entries(ADDONS) as [AddonKey, (typeof ADDONS)[AddonKey]][]
          ).map(([key, addon]) => {
            const active = addonKeys.includes(key);
            return (
              <button
                type="button"
                key={key}
                onClick={() => toggleAddon(key)}
                className={`group cursor-pointer text-left card-glass p-8 rounded-sm border transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/30 hover:bg-zinc-900/80"
                } hover:transform hover:-translate-y-1`}
              >
                {active && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                )}
                <h3 className="text-xl font-display font-bold italic text-white mb-3 group-hover:text-primary transition-colors">
                  {addon.label}
                </h3>
                <div className="w-8 h-0.5 bg-primary/50 mb-4" />
                <p className="text-sm text-gray-400 leading-relaxed font-light not-italic">
                  +${addon.price} flat fee
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  STEP 5 — Date & Time                                              */
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
    for (let i = 0; i < 6; i++) weekDays.push(addDays(weekStart, i));

    const canGoPrev = weekStart > today;
    const maxWeekStart = addDays(today, 12 * 7);
    const canGoNext = weekStart < maxWeekStart;
    const weekLabel = `${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekDays[5].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => canGoPrev && setWeekStart(addDays(weekStart, -7))}
            disabled={!canGoPrev}
            className={`p-2 ${canGoPrev ? "hover:bg-zinc-800 text-gray-400 hover:text-white" : "opacity-30 cursor-not-allowed text-gray-600"}`}
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <span className="font-display font-bold text-white not-italic">{weekLabel}</span>
          <button
            type="button"
            onClick={() => canGoNext && setWeekStart(addDays(weekStart, 7))}
            disabled={!canGoNext}
            className={`p-2 ${canGoNext ? "hover:bg-zinc-800 text-gray-400 hover:text-white" : "opacity-30 cursor-not-allowed text-gray-600"}`}
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {loadingRange && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-gray-500 not-italic">Loading availability&hellip;</p>
          </div>
        )}

        {!loadingRange && rangeError && (
          <div className="text-center py-8 text-red-400">
            <p className="not-italic">{rangeError}</p>
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
              const dayLabel = day.toLocaleDateString("en-US", { weekday: "short" });
              const dateLabel = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });

              return (
                <div
                  key={dateKey}
                  className={`rounded-sm border p-3 ${
                    disabled
                      ? "opacity-40 bg-zinc-900/20 border-zinc-800"
                      : "bg-zinc-900 border-zinc-800"
                  }`}
                >
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-500 font-medium not-italic">{dayLabel}</div>
                    <div className="text-sm font-bold text-white not-italic">{dateLabel}</div>
                  </div>
                  {disabled && (
                    <p className="text-xs text-gray-600 text-center not-italic">
                      {isSunday ? "Closed" : "Past"}
                    </p>
                  )}
                  {!disabled && daySlots.length === 0 && (
                    <p className="text-xs text-gray-600 text-center not-italic">No slots</p>
                  )}
                  {!disabled && daySlots.length > 0 && (
                    <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
                      {daySlots.map((slot, i) => {
                        const slotActive = selectedSlot?.startAt === slot.startAt;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => handleSelectSlot(slot)}
                            className={`w-full py-1.5 px-2 text-xs font-medium transition-all not-italic rounded-sm ${
                              slotActive
                                ? "bg-primary text-white"
                                : "bg-zinc-800 hover:bg-zinc-700 text-gray-300"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <MonthCalendar
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            onMonthChange={fetchRange}
            slotsByDate={slotsByDate}
          />
        </div>

        <div className="lg:col-span-4">
          <div className="bg-surface-dark border border-white/5 h-full rounded-sm shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-display font-bold text-white mb-1">
                {selectedDate ? formatDateDisplay(selectedDate).split(",").slice(0, 2).join(",") : "Select a Date"}
              </h3>
              <p className="text-sm text-gray-400 not-italic">Select an arrival window</p>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-3 custom-scrollbar">
              {!selectedDate && (
                <div className="text-gray-500 text-center py-12 not-italic">
                  <span className="material-symbols-outlined text-4xl mb-3 block text-gray-600">calendar_month</span>
                  Pick a date to see open times
                </div>
              )}

              {selectedDate && loadingRange && (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-gray-500 not-italic">Loading&hellip;</p>
                </div>
              )}

              {selectedDate && !loadingRange && slotsForSelectedDate.length === 0 && (
                <div className="text-center py-8 text-gray-500 not-italic">
                  <p className="font-medium text-white">No available times</p>
                  <p className="text-sm mt-1">Try another day.</p>
                </div>
              )}

              {selectedDate && !loadingRange && slotsForSelectedDate.length > 0 &&
                slotsForSelectedDate.map((slot, i) => {
                  const slotActive = selectedSlot?.startAt === slot.startAt;
                  const hour = new Date(slot.startAt).getHours();
                  const isMorning = hour < 12;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => handleSelectSlot(slot)}
                      className={`group relative w-full flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all duration-300 ${
                        slotActive
                          ? "bg-primary/10 border-primary/50 shadow-[0_0_15px_rgba(210,31,60,0.1)]"
                          : "bg-zinc-900 border-zinc-800 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-lg ${slotActive ? "text-primary" : "text-gray-500"}`}>
                          {isMorning ? "wb_sunny" : "wb_twilight"}
                        </span>
                        <span className="font-bold text-white not-italic">{formatTime(slot.startAt)}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        slotActive ? "border-primary bg-primary" : "border-gray-600"
                      }`}>
                        {slotActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      {slotActive && (
                        <div className="absolute inset-0 border-2 border-primary rounded-sm pointer-events-none" />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStep5() {
    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white italic">
              PICK A DATE &amp; TIME
            </h2>
          </div>
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-sm p-1 self-start sm:self-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all not-italic ${
                viewMode === "week"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all not-italic ${
                viewMode === "month"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-gray-500 hover:text-white"
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
        <div className="mb-8">
          <div className="flex justify-start mb-2">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors not-italic shrink-0"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Back
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white italic leading-tight mb-4">
            YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              INFORMATION
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg border-l border-white/10 pl-4 not-italic">
            We need a few details to confirm your appointment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-2/3 space-y-8">
            {/* Contact */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3 font-body not-italic">
                <span className="material-symbols-outlined text-primary">person</span> Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass("firstName")}
                    placeholder="e.g. Luke"
                  />
                  {fieldErrors.firstName && <p className="text-red-400 text-xs not-italic">{fieldErrors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass("lastName")}
                    placeholder="e.g. Smith"
                  />
                  {fieldErrors.lastName && <p className="text-red-400 text-xs not-italic">{fieldErrors.lastName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass("email")}
                    placeholder="luke@example.com"
                  />
                  {fieldErrors.email && <p className="text-red-400 text-xs not-italic">{fieldErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass("phone")}
                    placeholder="(530) 555-0123"
                  />
                  {fieldErrors.phone && <p className="text-red-400 text-xs not-italic">{fieldErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3 font-body not-italic">
                <span className="material-symbols-outlined text-primary">directions_car</span> Vehicle Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Year / Make / Model</label>
                  <input
                    type="text"
                    value={carInfo}
                    onChange={(e) => setCarInfo(e.target.value)}
                    className={inputClass("carInfo")}
                    placeholder="2021 Tesla Model 3"
                  />
                  {fieldErrors.carInfo && <p className="text-red-400 text-xs not-italic">{fieldErrors.carInfo}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Color</label>
                  <input
                    type="text"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    className={inputClass("carColor")}
                    placeholder="e.g. Black"
                  />
                  {fieldErrors.carColor && <p className="text-red-400 text-xs not-italic">{fieldErrors.carColor}</p>}
                </div>
              </div>
            </div>

            {/* Service Location */}
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3 font-body not-italic">
                <span className="material-symbols-outlined text-primary">location_on</span> Service Location
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Street Address</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className={inputClass("streetAddress")}
                    placeholder="123 Main St"
                  />
                  {fieldErrors.streetAddress && <p className="text-red-400 text-xs not-italic">{fieldErrors.streetAddress}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Apt / Suite <span className="text-gray-600">(optional)</span></label>
                  <input
                    type="text"
                    value={aptSuite}
                    onChange={(e) => setAptSuite(e.target.value)}
                    className={inputClass()}
                    placeholder="Unit B"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputClass("city")}
                      placeholder="Yuba City"
                    />
                    {fieldErrors.city && <p className="text-red-400 text-xs not-italic">{fieldErrors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={inputClass("state")}
                      placeholder="CA"
                    />
                    {fieldErrors.state && <p className="text-red-400 text-xs not-italic">{fieldErrors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Zip Code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className={inputClass("zip")}
                      placeholder="95991"
                    />
                    {fieldErrors.zip && <p className="text-red-400 text-xs not-italic">{fieldErrors.zip}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block not-italic">Special Instructions <span className="text-gray-600">(optional)</span></label>
                  <textarea
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:ring-primary focus:border-primary p-4 text-sm rounded-none h-24 resize-none transition-all hover:border-white/20"
                    placeholder="Gate codes, parking instructions, specific concerns..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <div className="bg-[#111] border border-white/10 p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
                <h3 className="text-2xl font-display font-bold text-white mb-6 italic">
                  Booking Summary
                </h3>

                <div className="mb-6 pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1 block not-italic">Selected Service</span>
                  <h4 className="text-xl text-white font-bold not-italic">{SERVICES[serviceKey!].name}</h4>
                </div>

                <div className="mb-6 pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block not-italic">Vehicle</span>
                  <span className="text-white text-sm font-medium not-italic">{VEHICLES[vehicleKey!].name}</span>
                  <div className="mt-2 text-xs text-gray-500 not-italic">
                    Condition: <span className="text-white">{CONDITIONS[conditionKey!].name}</span>
                  </div>
                </div>

                {(streetAddress || city || state || zip) && (
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block not-italic">Service Location</span>
                    <p className="text-white text-sm not-italic">
                      {[streetAddress, aptSuite, city, state, zip].filter(Boolean).join(", ")}
                    </p>
                    {serviceNotes.trim() && (
                      <p className="text-gray-400 text-xs mt-2 not-italic italic">{serviceNotes.trim()}</p>
                    )}
                  </div>
                )}

                {selectedDate && selectedSlot && (
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block not-italic">Appointment</span>
                    <div className="flex items-center gap-3 text-white text-sm mb-2 not-italic">
                      <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
                      {formatDateDisplay(selectedDate)}
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm not-italic">
                      <span className="material-symbols-outlined text-primary text-base">schedule</span>
                      {formatTime(selectedSlot.startAt)}
                    </div>
                  </div>
                )}

                {addonKeys.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block not-italic">Add-ons</span>
                    <ul className="space-y-2">
                      {addonKeys.map((key) => (
                        <li key={key} className="flex justify-between text-sm text-gray-300 not-italic">
                          <span>{ADDONS[key].label}</span>
                          <span>+${ADDONS[key].price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-black/40 p-6 -mx-8 -mb-8 border-t border-white/10">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-gray-400 text-xs uppercase tracking-widest not-italic">Total Estimated</span>
                    <span className="text-3xl font-display font-bold text-white italic">${quote?.totalPrice}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 text-right mb-6 not-italic">*Final price may vary based on inspection.</p>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 uppercase tracking-[0.2em] text-xs transition-all shadow-[0_4px_20px_rgba(210,31,60,0.4)] flex justify-center items-center gap-2 group hover:shadow-[0_0_30px_rgba(210,31,60,0.6)] transform hover:-translate-y-1 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                    {!isSubmitting && (
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">check</span>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 mt-4 not-italic">
                    By booking, you agree to our Terms of Service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-sm text-red-400 text-sm not-italic">
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
    <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
      {/* Step Bar */}
      <div className="mb-12 max-w-4xl mx-auto">
        {/* Mobile: only current step title */}
        <div className="md:hidden mb-3">
          <span className="text-primary font-bold uppercase tracking-widest text-sm not-italic">
            {stepLabels[step - 1]}
          </span>
        </div>
        {/* Desktop: all step labels */}
        <div className="hidden md:flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
          {stepLabels.map((label, i) => {
            const s = i + 1;
            const active = s === step;
            const completed = s < step;
            return (
              <span
                key={s}
                className={active ? "text-primary" : completed ? "text-white" : ""}
              >
                {label}
              </span>
            );
          })}
        </div>
        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(210,31,60,0.5)] transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className="hidden md:flex justify-between mt-2">
          <span className="text-[10px] text-gray-600 uppercase tracking-widest not-italic">
            Step 1
          </span>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest not-italic">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
      </div>

      {/* Sticky Bottom Bar - steps 1-5 only; step 6 uses sidebar Confirm */}
      {step < TOTAL_STEPS && (
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#0f0f0f] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] px-6 py-4 lg:py-6">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="hidden lg:block min-w-0">
            {step >= 3 && serviceKey && vehicleKey && (
              <>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1 not-italic">Selected Package</span>
                <span className="text-sm font-bold text-white not-italic truncate block">
                  {SERVICES[serviceKey].name} ({VEHICLES[vehicleKey].name})
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between lg:justify-end">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors not-italic py-2 -ml-1"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
                Back
              </button>
            ) : (
              <div />
            )}
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className={`bg-primary hover:bg-primary-dark text-white px-8 py-3 lg:px-12 lg:py-4 rounded-sm font-bold uppercase text-xs tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] transform hover:-translate-y-0.5 flex items-center gap-3 ${
                  !canContinue ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next Step <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canContinue || isSubmitting}
                className={`bg-primary hover:bg-primary-dark text-white px-8 py-3 lg:px-12 lg:py-4 rounded-sm font-bold uppercase text-xs tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] flex items-center gap-3 ${
                  !canContinue || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
                {!isSubmitting && <span className="material-symbols-outlined text-sm">check</span>}
              </button>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Spacer so content isn't hidden behind fixed bar (steps 1-5 only) */}
      {step < TOTAL_STEPS && <div className="h-20 lg:h-24" />}
    </div>
  );
}
