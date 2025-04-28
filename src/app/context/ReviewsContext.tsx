"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ReviewsContextType = {
  isReviewsLoaded: boolean;
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
  // Initialize states from localStorage if available
  const [isReviewsLoaded, setIsReviewsLoadedState] = useState<boolean>(false);
  const [hasVisitedBefore, setHasVisitedBeforeState] = useState<boolean>(false);
  
  // Check local storage on first render
  useEffect(() => {
    // Only run on client side to avoid SSR issues
    if (typeof window !== 'undefined') {
      const storedIsLoaded = localStorage.getItem('reviewsLoaded');
      const storedHasVisited = localStorage.getItem('reviewsVisited');
      
      if (storedIsLoaded === 'true') {
        setIsReviewsLoadedState(true);
      }
      
      if (storedHasVisited === 'true') {
        setHasVisitedBeforeState(true);
      }
    }
  }, []);
  
  // Setter functions that update both state and localStorage
  const setIsReviewsLoaded = (loaded: boolean) => {
    setIsReviewsLoadedState(loaded);
    if (typeof window !== 'undefined') {
      localStorage.setItem('reviewsLoaded', loaded.toString());
    }
  };
  
  const setHasVisitedBefore = (visited: boolean) => {
    setHasVisitedBeforeState(visited);
    if (typeof window !== 'undefined') {
      localStorage.setItem('reviewsVisited', visited.toString());
    }
  };

  const value = {
    isReviewsLoaded,
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