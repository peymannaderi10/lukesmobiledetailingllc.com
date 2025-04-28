"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ReviewsContextType = {
  isReviewsLoaded: boolean;
  hasVisitedBefore: boolean;
  setIsReviewsLoaded: (loaded: boolean) => void;
  setHasVisitedBefore: (visited: boolean) => void;
  resetReviewsState: () => void;
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
  // Initialize with default values
  const [isReviewsLoaded, setIsReviewsLoadedState] = useState<boolean>(false);
  const [hasVisitedBefore, setHasVisitedBeforeState] = useState<boolean>(false);
  
  // Load state from localStorage on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedIsLoaded = localStorage.getItem('reviewsLoaded') === 'true';
        const storedHasVisited = localStorage.getItem('reviewsVisited') === 'true';
        
        console.log('ReviewsContext: Initial load from localStorage:', { 
          storedIsLoaded, 
          storedHasVisited 
        });
        
        setIsReviewsLoadedState(storedIsLoaded);
        setHasVisitedBeforeState(storedHasVisited);
      } catch (error) {
        console.error('Error loading reviews state from localStorage:', error);
      }
    }
  }, []);
  
  // Setter functions that update both state and localStorage
  const setIsReviewsLoaded = (loaded: boolean) => {
    console.log('ReviewsContext: Setting isReviewsLoaded to', loaded);
    setIsReviewsLoadedState(loaded);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('reviewsLoaded', loaded.toString());
      } catch (error) {
        console.error('Error saving reviews loaded state to localStorage:', error);
      }
    }
  };
  
  const setHasVisitedBefore = (visited: boolean) => {
    console.log('ReviewsContext: Setting hasVisitedBefore to', visited);
    setHasVisitedBeforeState(visited);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('reviewsVisited', visited.toString());
      } catch (error) {
        console.error('Error saving reviews visited state to localStorage:', error);
      }
    }
  };
  
  // Function to reset the state (useful for debugging or when needed)
  const resetReviewsState = () => {
    console.log('ReviewsContext: Resetting review state');
    setIsReviewsLoadedState(false);
    setHasVisitedBeforeState(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('reviewsLoaded');
        localStorage.removeItem('reviewsVisited');
      } catch (error) {
        console.error('Error removing reviews state from localStorage:', error);
      }
    }
  };

  const value = {
    isReviewsLoaded,
    hasVisitedBefore,
    setIsReviewsLoaded,
    setHasVisitedBefore,
    resetReviewsState,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}; 