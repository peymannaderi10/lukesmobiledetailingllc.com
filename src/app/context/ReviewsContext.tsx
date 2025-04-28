"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ReviewsContextType = {
  isReviewsLoaded: boolean;
  isAnimationComplete: boolean;
  hasVisitedBefore: boolean;
  setIsReviewsLoaded: (loaded: boolean) => void;
  setHasVisitedBefore: (visited: boolean) => void;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

  // When reviews are loaded, wait for the animation to complete
  useEffect(() => {
    if (isReviewsLoaded && !isAnimationComplete) {
      // Wait additional time for the masonry layout animation to finish
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
      }, 3000); // 3 seconds delay to ensure animation is complete

      return () => clearTimeout(timer);
    }
  }, [isReviewsLoaded, isAnimationComplete]);

  const value = {
    isReviewsLoaded,
    isAnimationComplete,
    hasVisitedBefore,
    setIsReviewsLoaded,
    setHasVisitedBefore,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}; 