/**
 * Slider components - local implementations
 */
import React, { useState, createContext, useContext, useMemo, Children, useEffect } from 'react';
import type { SliderProps, SliderArrowProps } from '../component-props';

// ============================================================================
// SLIDER CONTEXT
// ============================================================================

interface SliderContextValue {
  currentSlide: number;
  totalSlides: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

const SliderContext = createContext<SliderContextValue | null>(null);

function useSliderContext() {
  const ctx = useContext(SliderContext);
  if (!ctx) throw new Error('Slider components must be used within SliderWrapper');
  return ctx;
}

// ============================================================================
// SLIDER COMPONENTS
// ============================================================================

export interface SliderWrapperProps extends SliderProps {
  className?: string;
  children?: React.ReactNode;
}

export function SliderWrapper({
  className,
  children,
  animation = 'slide',
  easing = 'ease',
  duration = 500,
  infinite = true,
  disableSwipe = false,
  autoplay = true,
  delay = 4000,
  autoMax = 0,
  hideArrows = false,
}: SliderWrapperProps) {
  // Count slides from children
  const slideCount = useMemo(() => {
    let count = 0;
    Children.forEach(children, child => {
      if (React.isValidElement(child) && child.type === SliderMask) {
        count = Children.count(child.props.children);
      }
    });
    return count || 1;
  }, [children]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index: number) => {
    if (infinite) {
      setCurrentSlide(((index % slideCount) + slideCount) % slideCount);
    } else if (index >= 0 && index < slideCount) {
      setCurrentSlide(index);
    }
  };

  const next = () => goTo(currentSlide + 1);
  const prev = () => goTo(currentSlide - 1);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || slideCount <= 1) return;
    const timer = setInterval(next, delay);
    return () => clearInterval(timer);
  }, [autoplay, delay, isPaused, currentSlide, slideCount]);

  return (
    <SliderContext.Provider value={{ currentSlide, totalSlides: slideCount, goTo, next, prev }}>
      <div
        className={`${className || ''} w-slider`}
        role="region"
        aria-label="carousel"
        aria-roledescription="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        data-autoplay={autoplay}
        data-animation={animation}
        data-duration={duration}
        data-easing={easing}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
}

export function SliderMask({ className, children }: SliderWrapperProps) {
  const { currentSlide } = useSliderContext();
  // translateX by 100% per slide - CSS classes control actual slide widths
  // If CSS sets slides to 33.33% width (3 visible), translateX(100%) shows next group
  const translateX = -currentSlide * 100;

  return (
    <div className={`${className || ''} w-slider-mask`} style={{ overflow: 'hidden' }} aria-live="polite">
      <div style={{
        display: 'flex',
        transition: 'transform 0.3s ease',
        transform: `translateX(${translateX}%)`,
      }}>
        {children}
      </div>
    </div>
  );
}

export interface SliderSlideProps {
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

export function SliderSlide({ className, children, isActive }: SliderSlideProps) {
  // No inline width/flex styles - CSS classes control slide width
  // If CSS sets .w-slide { width: 33.33%; }, 3 slides will be visible at once
  return (
    <div
      className={`${className || ''} w-slide ${isActive ? 'w-active' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}

export interface SliderArrowProps {
  direction?: 'left' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export function SliderArrow({ direction = 'right', className, children }: SliderArrowProps) {
  const { next, prev } = useSliderContext();
  const arrowClass = direction === 'left' ? 'w-slider-arrow-left' : 'w-slider-arrow-right';

  return (
    <button
      className={`${className || ''} ${arrowClass}`}
      onClick={direction === 'left' ? prev : next}
      aria-label={direction === 'left' ? 'previous slide' : 'next slide'}
      role="button"
      tabIndex={0}
    >
      {children}
    </button>
  );
}

export interface SliderNavProps {
  className?: string;
}

export function SliderNav({ className }: SliderNavProps) {
  const { currentSlide, totalSlides, goTo } = useSliderContext();

  return (
    <div className={`${className || ''} w-slider-nav`} role="tablist">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <div
          key={i}
          onClick={() => goTo(i)}
          className={`w-slider-dot ${i === currentSlide ? 'w-active' : ''}`}
          role="button"
          tabIndex={i === currentSlide ? 0 : -1}
          aria-label={`Show slide ${i + 1} of ${totalSlides}`}
          aria-pressed={i === currentSlide}
        />
      ))}
    </div>
  );
}
