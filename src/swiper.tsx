/**
 * Swiper Slider components - using Swiper library
 * Full-featured, modern slider with no restrictions
 */
import React, { useRef, useEffect, Children, isValidElement } from 'react';
import { Swiper, SwiperSlide as SwiperSlideCore } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, EffectFade, EffectCube, EffectCoverflow, EffectFlip, EffectCards, EffectCreative, FreeMode } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/free-mode';

// ============================================================================
// TYPES
// ============================================================================

export interface SwiperSliderProps {
  className?: string;
  children?: React.ReactNode;
  // Core settings
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  direction?: 'horizontal' | 'vertical';
  loop?: boolean;
  speed?: number;
  initialSlide?: number;
  slidesPerGroup?: number;
  // Autoplay
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean; pauseOnMouseEnter?: boolean };
  // Effects
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative';
  // Navigation
  navigation?: boolean;
  pagination?: boolean | { type?: 'bullets' | 'fraction' | 'progressbar'; clickable?: boolean };
  scrollbar?: boolean | { draggable?: boolean };
  // Touch & Interaction
  allowTouchMove?: boolean;
  grabCursor?: boolean;
  freeMode?: boolean;
  centeredSlides?: boolean;
  // Responsive
  breakpoints?: Record<number, Partial<SwiperOptions>>;
  // Other props
  [key: string]: any;
}

export interface SwiperSlideProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * SwiperSlider - Main slider container
 * Wraps Swiper library with support for custom navigation/pagination placement
 */
export function SwiperSlider({
  className,
  children,
  slidesPerView = 1,
  spaceBetween = 0,
  direction = 'horizontal',
  loop = false,
  speed = 300,
  initialSlide = 0,
  slidesPerGroup = 1,
  autoplay = false,
  effect = 'slide',
  navigation = false,
  pagination = false,
  scrollbar = false,
  allowTouchMove = true,
  grabCursor = false,
  freeMode = false,
  centeredSlides = false,
  breakpoints,
  ...props
}: SwiperSliderProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // Separate children into slides and control elements
  const slides: React.ReactNode[] = [];
  let customPrevNav: React.ReactNode = null;
  let customNextNav: React.ReactNode = null;
  let customPagination: React.ReactNode = null;
  let customScrollbar: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      otherChildren.push(child);
      return;
    }

    const displayName = (child.type as any)?.displayName || (child.type as any)?.name;

    if (displayName === 'SwiperSlide' || child.type === SwiperSlide) {
      slides.push(child);
    } else if (displayName === 'SwiperNavPrev' || child.type === SwiperNavPrev) {
      customPrevNav = child;
    } else if (displayName === 'SwiperNavNext' || child.type === SwiperNavNext) {
      customNextNav = child;
    } else if (displayName === 'SwiperPagination' || child.type === SwiperPagination) {
      customPagination = child;
    } else if (displayName === 'SwiperScrollbar' || child.type === SwiperScrollbar) {
      customScrollbar = child;
    } else {
      otherChildren.push(child);
    }
  });

  // Build modules array based on enabled features
  const modules = [Navigation, Pagination, Scrollbar, Autoplay, FreeMode];
  if (effect === 'fade') modules.push(EffectFade);
  if (effect === 'cube') modules.push(EffectCube);
  if (effect === 'coverflow') modules.push(EffectCoverflow);
  if (effect === 'flip') modules.push(EffectFlip);
  if (effect === 'cards') modules.push(EffectCards);
  if (effect === 'creative') modules.push(EffectCreative);

  // Build autoplay config
  const autoplayConfig = autoplay === true
    ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
    : autoplay || false;

  // Build pagination config
  const paginationConfig = pagination === true
    ? { clickable: true, el: customPagination ? paginationRef.current : undefined }
    : pagination
      ? { ...pagination, el: customPagination ? paginationRef.current : undefined }
      : false;

  // Build scrollbar config
  const scrollbarConfig = scrollbar === true
    ? { draggable: true, el: customScrollbar ? scrollbarRef.current : undefined }
    : scrollbar
      ? { ...scrollbar, el: customScrollbar ? scrollbarRef.current : undefined }
      : false;

  return (
    <div className={`${className || ''} swiper-container`} {...props}>
      <Swiper
        modules={modules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        direction={direction}
        loop={loop}
        speed={speed}
        initialSlide={initialSlide}
        slidesPerGroup={slidesPerGroup}
        autoplay={autoplayConfig}
        effect={effect}
        navigation={
          navigation
            ? {
                prevEl: customPrevNav ? prevRef.current : undefined,
                nextEl: customNextNav ? nextRef.current : undefined,
              }
            : false
        }
        pagination={paginationConfig}
        scrollbar={scrollbarConfig}
        allowTouchMove={allowTouchMove}
        grabCursor={grabCursor}
        freeMode={freeMode}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        onBeforeInit={(swiper) => {
          // Connect custom navigation elements after init
          if (customPrevNav && prevRef.current && typeof swiper.params.navigation === 'object') {
            swiper.params.navigation.prevEl = prevRef.current;
          }
          if (customNextNav && nextRef.current && typeof swiper.params.navigation === 'object') {
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlideCore key={idx}>{slide}</SwiperSlideCore>
        ))}
      </Swiper>

      {/* Custom navigation - rendered outside Swiper for flexible placement */}
      {customPrevNav && <div ref={prevRef}>{customPrevNav}</div>}
      {customNextNav && <div ref={nextRef}>{customNextNav}</div>}
      {customPagination && <div ref={paginationRef}>{customPagination}</div>}
      {customScrollbar && <div ref={scrollbarRef}>{customScrollbar}</div>}
      {otherChildren}
    </div>
  );
}

/**
 * SwiperSlide - Individual slide
 */
export function SwiperSlide({ className, children, ...props }: SwiperSlideProps) {
  return (
    <div className={`${className || ''} swiper-slide`} {...props}>
      {children}
    </div>
  );
}
SwiperSlide.displayName = 'SwiperSlide';

/**
 * SwiperNavPrev - Previous navigation button
 * NOTE: We don't add swiper-button-prev class because it shows Swiper's default arrow via ::after
 * The init script connects this element via data-swiper-nav attribute instead
 */
export function SwiperNavPrev({ className, children, ...props }: { className?: string; children?: React.ReactNode; [key: string]: any }) {
  return (
    <div className={className || ''} role="button" tabIndex={0} aria-label="Previous slide" data-swiper-nav="prev" {...props}>
      {children || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      )}
    </div>
  );
}
SwiperNavPrev.displayName = 'SwiperNavPrev';

/**
 * SwiperNavNext - Next navigation button
 * NOTE: We don't add swiper-button-next class because it shows Swiper's default arrow via ::after
 * The init script connects this element via data-swiper-nav attribute instead
 */
export function SwiperNavNext({ className, children, ...props }: { className?: string; children?: React.ReactNode; [key: string]: any }) {
  return (
    <div className={className || ''} role="button" tabIndex={0} aria-label="Next slide" data-swiper-nav="next" {...props}>
      {children || (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </div>
  );
}
SwiperNavNext.displayName = 'SwiperNavNext';

/**
 * SwiperPagination - Pagination dots/bullets
 * NOTE: We don't add swiper-pagination class because it shows Swiper's default dots
 * For custom pagination, use your own styling; for default dots, Swiper will populate this element
 */
export function SwiperPagination({ className, ...props }: { className?: string; [key: string]: any }) {
  return <div className={className || ''} data-swiper-pagination="true" {...props} />;
}
SwiperPagination.displayName = 'SwiperPagination';

/**
 * SwiperScrollbar - Scrollbar
 * NOTE: We don't add swiper-scrollbar class because it shows Swiper's default scrollbar
 */
export function SwiperScrollbar({ className, ...props }: { className?: string; [key: string]: any }) {
  return <div className={className || ''} data-swiper-scrollbar="true" {...props} />;
}
SwiperScrollbar.displayName = 'SwiperScrollbar';
