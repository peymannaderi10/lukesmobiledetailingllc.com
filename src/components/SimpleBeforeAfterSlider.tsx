"use client";

import { useEffect, useRef } from 'react';

interface SimpleBeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export default function SimpleBeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className = ""
}: SimpleBeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const afterImageRef = useRef<HTMLImageElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const sliderHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const beforeImg = beforeImageRef.current;
    const afterImg = afterImageRef.current;
    const sliderLine = sliderLineRef.current;
    const sliderHandle = sliderHandleRef.current;

    if (!container || !beforeImg || !afterImg || !sliderLine || !sliderHandle) {
      return;
    }

    let currentPosition = 50; // Start at 50%
    let isDragging = false;
    let rafId: number;

    const updateSlider = (position: number) => {
      currentPosition = Math.max(0, Math.min(100, position));
      const percentage = currentPosition / 100;

      // Update clip-path for after image (no transition for real-time response)
      afterImg.style.clipPath = `polygon(${percentage * 100}% 0%, 100% 0%, 100% 100%, ${percentage * 100}% 100%)`;

      // Update slider line and handle position
      sliderLine.style.left = `${currentPosition}%`;
      sliderHandle.style.left = `${currentPosition}%`;
    };

    const updateSliderPosition = (clientX: number) => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = clientX - rect.left;
          const position = (x / rect.width) * 100;
          updateSlider(position);
          rafId = 0;
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      sliderHandle.style.cursor = 'grabbing';
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
      };

      const handleMouseUp = () => {
        isDragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        sliderHandle.style.cursor = 'grab';
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;

      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        updateSliderPosition(touch.clientX);
      };

      const handleTouchEnd = () => {
        isDragging = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };

    // Initialize slider at 50% - use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      updateSlider(50);
    });

    // Event listeners
    sliderHandle.addEventListener('mousedown', handleMouseDown);
    sliderHandle.addEventListener('touchstart', handleTouchStart);

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      sliderHandle.removeEventListener('mousedown', handleMouseDown);
      sliderHandle.removeEventListener('touchstart', handleTouchStart);
    };
  }, [beforeImage, afterImage]);

  return (
    <div className={`before-after-wrapper ${className}`} ref={containerRef}>
      <img
        ref={beforeImageRef}
        className="before-image"
        src={beforeImage}
        alt={beforeAlt}
      />
      <img
        ref={afterImageRef}
        className="after-image"
        src={afterImage}
        alt={afterAlt}
      />

      <div className="slider-line" ref={sliderLineRef}></div>

      <div className="slider-handle" ref={sliderHandleRef}>
        <span className="material-symbols-outlined text-primary text-xl" style={{ animationDuration: '2s' }}>
          compare_arrows
        </span>
      </div>

      <div className="slider-labels">
        <span className="before-label">Before</span>
        <span className="after-label">After</span>
      </div>
    </div>
  );
}

