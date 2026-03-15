/**
 * Webflow Defaults CSS
 *
 * Single CSS file containing all Webflow component defaults.
 * Based on Webflow Designer CSS with missing classes added.
 */

import * as fs from 'fs';
import * as path from 'path';

// =============================================================================
// CSS LOADING
// =============================================================================

const CSS_DIR = path.dirname(__filename);

let _webflowCSS: string | null = null;

function loadCSS(): string {
  if (_webflowCSS === null) {
    try {
      _webflowCSS = fs.readFileSync(path.join(CSS_DIR, 'webflow.css'), 'utf-8');
    } catch {
      console.warn('[webflow-defaults] Failed to load webflow.css');
      _webflowCSS = '';
    }
  }
  return _webflowCSS;
}

// =============================================================================
// TYPES
// =============================================================================

export interface GeneratedCSS {
  /** Combined CSS string */
  css: string;
  /** Swiper CDN URL if swiper is used, null otherwise */
  swiperCdnUrl: string | null;
}

// Swiper CDN URL
const SWIPER_CDN_URL = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';

// =============================================================================
// CSS GENERATOR
// =============================================================================

/**
 * Get Webflow defaults CSS
 * @param options.includeSwiper - Whether to include Swiper CDN URL (default: false)
 * @returns Generated CSS and optional Swiper CDN URL
 */
export function getWebflowDefaultsCSS(options?: { includeSwiper?: boolean }): GeneratedCSS {
  return {
    css: loadCSS(),
    swiperCdnUrl: options?.includeSwiper ? SWIPER_CDN_URL : null,
  };
}

/**
 * Get raw CSS string
 */
export function getCSS(): string {
  return loadCSS();
}

// =============================================================================
// EXPORTS
// =============================================================================

export { SWIPER_CDN_URL };

// Re-export registry utilities for convenience
export {
  buildComponentFeaturesMap,
  getComponentFeature,
  getWebflowClasses,
  getDefaultTag,
  getXSCPType,
  isVoidElement,
  COMPONENT_REGISTRY,
} from '../src/registry';

// Re-export types
export type { ComponentDefinition } from '../src/registry';
export type { ComponentFeature, UsedFeatures } from '../src/types';
