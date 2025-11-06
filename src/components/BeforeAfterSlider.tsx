"use client";

import { useEffect } from 'react';

interface BeforeAfterPair {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

declare global {
  interface Window {
    beforeAfterCleanup?: () => void;
  }
}

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: '/Images/beforeAndAfter/passengerBefore.jpg',
    after: '/Images/beforeAndAfter/passengerAfter.jpg',
    beforeAlt: 'Before Detailing - Passenger Interior',
    afterAlt: 'After Detailing - Passenger Interior'
  },
  {
    before: '/Images/beforeAndAfter/carseatBefore.jpg',
    after: '/Images/beforeAndAfter/carseatAfter.jpg',
    beforeAlt: 'Before Detailing - Car Seats',
    afterAlt: 'After Detailing - Car Seats'
  },
  {
    before: '/Images/beforeAndAfter/carpetBefore.jpg',
    after: '/Images/beforeAndAfter/carpetAfter.jpg',
    beforeAlt: 'Before Detailing - Carpet',
    afterAlt: 'After Detailing - Carpet'
  }
];

export default function BeforeAfterSlider() {
  useEffect(() => {
    // Wait for DOM to be ready
    const initSlider = () => {
      const container = document.querySelector('#before-after .before-after-wrapper') as HTMLElement;
      const timerBar = document.querySelector('#before-after-timer-bar') as HTMLElement;

      if (!container || !timerBar) {
        // Try again in a moment if elements aren't ready
        setTimeout(initSlider, 100);
        return;
      }

      const beforeImage = container.querySelector('.before-image') as HTMLImageElement;
      const afterImage = container.querySelector('.after-image') as HTMLImageElement;
      const navButtons = document.querySelectorAll('.before-after-btn');
      const sliderLine = container.querySelector('.slider-line') as HTMLElement;
      const sliderHandle = container.querySelector('.slider-handle') as HTMLElement;

      let currentPairIndex = 0;
      let currentPosition = 50; // Start at 50%
      let isDragging = false;
      let animationFrame: number;
      let startTime: number;
      let pauseStartTime: number | null = null; // When pause started
      let rafId: number;
      let isPaused = false;
      const timerDuration = 8000; // 8 seconds - slowed down

      const updateSlider = (position: number) => {
        currentPosition = Math.max(0, Math.min(100, position));
        const percentage = currentPosition / 100;

        // Update clip-path for after image (no transition for real-time response)
        afterImage.style.clipPath = `polygon(${percentage * 100}% 0%, 100% 0%, 100% 100%, ${percentage * 100}% 100%)`;

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

      const animateTimer = (timestamp: number) => {
        if (!startTime) {
          startTime = timestamp;
        }

        // If paused, don't update the timer but keep animating to check for resume
        if (isPaused) {
          animationFrame = requestAnimationFrame(animateTimer);
          return;
        }

        // Calculate elapsed time
        const elapsed = timestamp - startTime;
        const progress = Math.min(Math.max(0, elapsed / timerDuration), 1);
        
        // Update bar width based on exact progress
        const widthPercent = progress * 100;
        timerBar.style.width = `${widthPercent}%`;
        timerBar.style.transition = 'none'; // Ensure no CSS transition interferes
        
        if (elapsed >= timerDuration) {
          // Ensure bar is at exactly 100% before switching
          timerBar.style.width = '100%';
          timerBar.style.transition = 'none';
          
          // Wait one more frame to ensure 100% is rendered before switching
          requestAnimationFrame(() => {
            switchToNextPair();
          });
        } else {
          // Continue animating
          animationFrame = requestAnimationFrame(animateTimer);
        }
      };

      const startTimer = () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        startTime = undefined!;
        pauseStartTime = null;
        isPaused = false;
        timerBar.style.width = '0%';
        timerBar.style.transition = 'none'; // Ensure no CSS transition interferes
        animationFrame = requestAnimationFrame(animateTimer);
      };

      const pauseTimer = () => {
        if (!isPaused && startTime) {
          isPaused = true;
          pauseStartTime = performance.now();
          // Adjust startTime to account for elapsed time so far
          const elapsed = pauseStartTime - startTime;
          startTime = performance.now() - elapsed;
        }
      };

      const resumeTimer = () => {
        if (isPaused && pauseStartTime !== null && startTime) {
          // Calculate how long we were paused
          const pauseDuration = performance.now() - pauseStartTime;
          // Adjust startTime forward by the pause duration
          startTime += pauseDuration;
          pauseStartTime = null;
          isPaused = false;
        }
      };

      const switchToNextPair = () => {
        currentPairIndex = (currentPairIndex + 1) % beforeAfterPairs.length;
        updatePair(currentPairIndex);
        startTimer();
      };

      const updatePair = (index: number) => {
        const pair = beforeAfterPairs[index];

        // Update active button
        navButtons.forEach((btn, i) => {
          btn.classList.toggle('active', i === index);
        });

        // Fade out images
        beforeImage.style.opacity = '0';
        afterImage.style.opacity = '0';

        // Wait for fade out, then change images and fade in
        setTimeout(() => {
          // Update images
          beforeImage.src = pair.before;
          afterImage.src = pair.after;
          beforeImage.alt = pair.beforeAlt;
          afterImage.alt = pair.afterAlt;

          // Reset slider to center
          updateSlider(50);

          // Fade in images
          setTimeout(() => {
            beforeImage.style.opacity = '1';
            afterImage.style.opacity = '1';
          }, 10);
        }, 300); // Wait for fade out transition (0.3s)
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

      // Event listeners
      sliderHandle.addEventListener('mousedown', handleMouseDown);
      sliderHandle.addEventListener('touchstart', handleTouchStart);

      // Hover events to pause/resume timer
      container.addEventListener('mouseenter', pauseTimer);
      container.addEventListener('mouseleave', resumeTimer);

      // Navigation button clicks
      navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          currentPairIndex = index;
          updatePair(index);
          startTimer();
        });
      });

      // Initialize first pair - set initial state without fade
      const initialPair = beforeAfterPairs[0];
      navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === 0);
      });
      beforeImage.src = initialPair.before;
      afterImage.src = initialPair.after;
      beforeImage.alt = initialPair.beforeAlt;
      afterImage.alt = initialPair.afterAlt;
      beforeImage.style.opacity = '1';
      afterImage.style.opacity = '1';
      updateSlider(50);
      startTimer();

      // Store cleanup function
      const cleanup = () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        sliderHandle.removeEventListener('mousedown', handleMouseDown);
        sliderHandle.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('mouseenter', pauseTimer);
        container.removeEventListener('mouseleave', resumeTimer);
        navButtons.forEach((btn) => {
          btn.removeEventListener('click', () => {});
        });
      };

      // Store cleanup on window for potential later use
      window.beforeAfterCleanup = cleanup;
    };

    initSlider();

    // Cleanup on unmount
    return () => {
      if (window.beforeAfterCleanup) {
        window.beforeAfterCleanup();
      }
    };
  }, []);

  return null; // This component handles the functionality but doesn't render anything
}
