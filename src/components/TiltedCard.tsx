"use client";
import type { SpringOptions } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mobileRef = useRef<HTMLElement>(null);
  const mobileRotateX = useSpring(useMotionValue(0), springValues);
  const mobileRotateY = useSpring(useMotionValue(0), springValues);
  const mobileScale = useSpring(1, springValues);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile scroll-based tilt animation
  useEffect(() => {
    if (!isMobile || !mobileRef.current) return;

    const handleScroll = () => {
      if (!mobileRef.current) return;

      const rect = mobileRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Calculate element's position relative to viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const elementLeft = rect.left;
      const elementRight = rect.right;
      const elementCenterY = rect.top + rect.height / 2;
      const elementCenterX = rect.left + rect.width / 2;
      
      // Check if element is in viewport
      const isInViewport = elementBottom > 0 && elementTop < windowHeight;
      
      if (!isInViewport) {
        mobileRotateX.set(0);
        mobileRotateY.set(0);
        mobileScale.set(1);
        return;
      }

      // Calculate progress based on element's position in viewport
      // As element scrolls through viewport, cycle through corners:
      // top-right -> bottom-right -> bottom-left -> top-left -> top-right (repeat)
      
      // Calculate element's position relative to viewport
      // When element enters from top: progress = 0 (top-right)
      // As element moves down: progress increases
      // When element exits at bottom: progress = 1 (back to top-right)
      
      const elementHeight = rect.height;
      
      // Calculate progress from 0 to 1 as element passes through viewport
      // 0 = element top at viewport top
      // 1 = element bottom at viewport bottom
      const viewportRange = windowHeight + elementHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / viewportRange));
      
      // Map progress to 0-4 range for 4 corners, creating continuous cycle
      // Each corner segment takes 0.25 of the progress
      const normalizedProgress = (progress * 4) % 4;
      
      let rotationX = 0;
      let rotationY = 0;
      
      // Map progress to rotation values cycling through corners
      // Top right (0-1): rotateX = -amplitude, rotateY = +amplitude
      // Bottom right (1-2): rotateX = +amplitude, rotateY = +amplitude
      // Bottom left (2-3): rotateX = +amplitude, rotateY = -amplitude
      // Top left (3-4): rotateX = -amplitude, rotateY = -amplitude
      
      if (normalizedProgress < 1) {
        // Top right -> Bottom right
        const t = normalizedProgress;
        rotationX = -rotateAmplitude + (t * 2 * rotateAmplitude);
        rotationY = rotateAmplitude;
      } else if (normalizedProgress < 2) {
        // Bottom right -> Bottom left
        const t = normalizedProgress - 1;
        rotationX = rotateAmplitude;
        rotationY = rotateAmplitude - (t * 2 * rotateAmplitude);
      } else if (normalizedProgress < 3) {
        // Bottom left -> Top left
        const t = normalizedProgress - 2;
        rotationX = rotateAmplitude - (t * 2 * rotateAmplitude);
        rotationY = -rotateAmplitude;
      } else {
        // Top left -> Top right
        const t = normalizedProgress - 3;
        rotationX = -rotateAmplitude;
        rotationY = -rotateAmplitude + (t * 2 * rotateAmplitude);
      }

      // Apply rotation (no scale)
      mobileRotateX.set(rotationX);
      mobileRotateY.set(rotationY);
      mobileScale.set(1.0);
    };

    // Use requestAnimationFrame for smooth animation
    let rafId: number;
    const scrollHandler = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile, rotateAmplitude, scaleOnHover, mobileRotateX, mobileRotateY, mobileScale]);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(1.0);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1.0);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  // If mobile, render image with scroll-based tilt animation
  if (isMobile) {
    return (
      <figure
        ref={mobileRef}
        className="relative w-full h-full flex flex-col items-center justify-center [perspective:800px]"
        style={{
          height: containerHeight,
          width: containerWidth
        }}
      >
        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX: mobileRotateX,
            rotateY: mobileRotateY,
            scale: mobileScale
          }}
        >
          <motion.img
            src={imageSrc}
            alt={altText}
            className="object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
            style={{
              width: imageWidth,
              height: imageHeight,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
          
          {displayOverlayContent && overlayContent && (
            <motion.div className="absolute top-6 left-6 z-[2] will-change-transform [transform:translateZ(30px)]">
              {overlayContent}
            </motion.div>
          )}
        </motion.div>
      </figure>
    );
  }

  // Desktop version with tilt effect
  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-6 left-6 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

    </figure>
  );
}

