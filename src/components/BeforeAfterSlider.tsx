"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterPair {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: "/Images/beforeAndAfter/passengerBefore.jpg",
    after: "/Images/beforeAndAfter/passengerAfter.jpg",
    beforeAlt: "Before Detailing - Passenger Interior",
    afterAlt: "After Detailing - Passenger Interior",
  },
  {
    before: "/Images/beforeAndAfter/carseatBefore.jpg",
    after: "/Images/beforeAndAfter/carseatAfter.jpg",
    beforeAlt: "Before Detailing - Car Seats",
    afterAlt: "After Detailing - Car Seats",
  },
  {
    before: "/Images/beforeAndAfter/carpetBefore.jpg",
    after: "/Images/beforeAndAfter/carpetAfter.jpg",
    beforeAlt: "Before Detailing - Carpet",
    afterAlt: "After Detailing - Carpet",
  },
];

export default function BeforeAfterSlider() {
  const [activePair, setActivePair] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pair = beforeAfterPairs[activePair];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      updatePosition(e.clientX);
      const onMove = (ev: MouseEvent) => {
        if (isDragging.current) updatePosition(ev.clientX);
      };
      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [updatePosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updatePosition(e.touches[0].clientX);
      const onMove = (ev: TouchEvent) => {
        if (isDragging.current) updatePosition(ev.touches[0].clientX);
      };
      const onEnd = () => {
        isDragging.current = false;
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onEnd);
    },
    [updatePosition]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActivePair((prev) => (prev + 1) % beforeAfterPairs.length);
      setSliderPos(50);
    }, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const switchPair = (index: number) => {
    setActivePair(index);
    setSliderPos(50);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActivePair((prev) => (prev + 1) % beforeAfterPairs.length);
      setSliderPos(50);
    }, 8000);
  };

  return (
    <div className="w-full">
      {/* Pair Navigation */}
      <div className="flex justify-center gap-3 mb-6">
        {beforeAfterPairs.map((_, index) => (
          <button
            key={index}
            onClick={() => switchPair(index)}
            className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 border ${
              index === activePair
                ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(210,31,60,0.5)]"
                : "bg-zinc-900 border-zinc-700 text-gray-400 hover:border-primary/50 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl aspect-square mx-auto shadow-[0_0_100px_-20px_rgba(0,0,0,1)] border-[8px] border-zinc-900 overflow-hidden cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* After Image (full background) */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <Image
            src={pair.after}
            alt={pair.afterAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden bg-gray-900 border-r-4 border-primary z-20"
          style={{ width: `${sliderPos}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pair.before}
            alt={pair.beforeAlt}
            className="absolute top-0 left-0 h-full object-cover filter contrast-125 brightness-75"
            style={{ maxWidth: "none", width: `${containerRef.current ? containerRef.current.offsetWidth : 600}px` }}
            draggable={false}
          />
          <div className="absolute top-3 left-3 md:left-6 bg-black/70 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 backdrop-blur-md border border-white/10 shadow-xl rounded-sm">
            Before
          </div>
        </div>

        {/* After Label */}
        <div className="absolute top-3 right-3 md:right-6 bg-white/90 text-black text-xs font-bold tracking-widest uppercase px-4 py-2 backdrop-blur-md z-10 shadow-xl rounded-sm">
          After
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] text-primary border-4 border-zinc-900 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <span className="material-symbols-outlined text-2xl animate-pulse">
            compare_arrows
          </span>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-xs tracking-[0.3em] uppercase text-center">
        Interactive &bull; Slide to Compare
      </p>
    </div>
  );
}
