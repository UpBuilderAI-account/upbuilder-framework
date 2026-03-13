# Framework Unification Plan

## Goal
Make `@upbuilder/react-framework` the single source of truth for all component definitions, eliminating scattered type definitions and mappings across backendv2, frontendv2, and shared packages.

---

## Current State (Problems)

### 1. Scattered Component Type Mappings
| Location | Purpose | Problem |
|----------|---------|---------|
| `backendv2/generators/webflow/types.ts:getDefaultTag()` | compType → HTML tag | 80+ types hardcoded |
| `backendv2/generators/webflow/types.ts:getXSCPType()` | compType → XSCP type | 10+ mappings hardcoded |
| `backendv2/generators/react/react-parser.ts:mapComponentName()` | JSX → compType | 65+ types hardcoded |
| `backendv2/services/webflow-preview-importer.ts:WEBFLOW_TYPE_TO_CLASSES` | type → w-* classes | 15+ types hardcoded |
| `upbuilder-framework/webflow-defaults/index.ts:COMPONENT_FEATURES` | compType → feature | 40+ types hardcoded |

### 2. Scattered Utility Functions
- `normalizeComb()` - Same logic in 4+ files
- Breakpoint constants - Hardcoded `991`, `479` everywhere
- Media query generation - Duplicated in parser, generator, CSS builder

### 3. No Shared Style Types
- `main`/`medium`/`tiny` vs `desktop`/`tablet`/`mobile` naming conflict
- 6+ different style type definitions

---

## Target State

```
┌─────────────────────────────────────────────────────────────────┐
│                  @upbuilder/react-framework                      │
├─────────────────────────────────────────────────────────────────┤
│  src/                                                            │
│  ├── index.ts          (React components + registry exports)    │
│  ├── registry.ts       (COMPONENT_REGISTRY, utilities)          │
│  ├── types.ts          (Shared type definitions)                │
│  ├── base.tsx          (Block, Section, Image, etc.)            │
│  ├── navigation.tsx    (Navbar components)                      │
│  ├── ...               (Other component files)                  │
│  └── utils.ts          (cn helper)                              │
│                                                                  │
│  webflow-defaults/                                               │
│  ├── index.ts          (Uses registry, generates CSS)           │
│  └── *.css             (CSS chunks)                             │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         backendv2       frontendv2      prompts
         (imports)       (imports)       (references)
```

---

## Implementation Steps

### Phase 1: Create Registry (`src/registry.ts`)

**New file with:**
- `BREAKPOINTS` constant
- `getMediaQuery()` function
- `normalizeComb()` function
- `ComponentDefinition` interface
- `COMPONENT_REGISTRY` - Complete mapping for all 95+ components
- Helper functions: `getDefaultTag()`, `getXSCPType()`, `getWebflowClasses()`, `isVoidElement()`

### Phase 2: Create Shared Types (`src/types.ts`)

**New file with:**
- `Breakpoint` type
- `PseudoState` type
- `CombType` type
- `FrameworkStyle` interface (unified style format)
- `ComponentSettings` interfaces (swiper, navbar, dropdown, tabs, etc.)

### Phase 3: Update Webflow Defaults

**Modify `webflow-defaults/index.ts`:**
- Import `COMPONENT_REGISTRY` from registry
- Derive `COMPONENT_FEATURES` from registry instead of hardcoding
- Export registry utilities

### Phase 4: Update Main Exports

**Modify `src/index.ts`:**
- Re-export everything from `registry.ts`
- Re-export types from `types.ts`

**Modify `package.json`:**
- Add export for `./registry`
- Add export for `./types`

### Phase 5: Migrate Backend (Future)

**Files to update in backendv2:**
- `generators/webflow/types.ts` - Remove `getDefaultTag()`, `getXSCPType()`, import from framework
- `generators/react/react-parser.ts` - Remove `mapComponentName()`, use registry
- `services/webflow-preview-importer.ts` - Remove `WEBFLOW_TYPE_TO_CLASSES`, use `getWebflowClasses()`
- `prompts/workflow/build-styles/index.ts` - Use `normalizeComb()` from framework
- `generators/shared/qa-parsers.ts` - Use `normalizeComb()` from framework

---

## File Changes Summary

### New Files
| File | Purpose |
|------|---------|
| `src/registry.ts` | Component registry & utilities |
| `src/types.ts` | Shared type definitions |

### Modified Files
| File | Changes |
|------|---------|
| `src/index.ts` | Add exports for registry and types |
| `webflow-defaults/index.ts` | Use registry instead of hardcoded COMPONENT_FEATURES |
| `package.json` | Add new export paths |

---

## Component Registry Structure

```typescript
interface ComponentDefinition {
  // Required
  tag: string;                    // Default HTML tag

  // Optional - XSCP/Webflow
  xscpType?: string;              // If different from component name
  webflowClasses?: string[];      // Auto-added w-* classes

  // Optional - Features
  feature?: ComponentFeature;     // For CSS generation
  voidElement?: boolean;          // Can't have children

  // Optional - Validation
  cssRules?: string[];            // CSS validation notes
  requiredChildren?: string[];    // Must contain these components
  forbiddenCss?: string[];        // CSS properties to warn about
}
```

---

## Complete Component List (95+ components)

### Layout (12)
- Block, Section, BlockContainer, Container, Clearfix, InlineBlock
- BlockLink, HFlex, VFlex, Grid, Row, Column

### Typography (16)
- Heading, Paragraph, Span, Strong, Emphasized, LineBreak
- Blockquote, RichText, Figure, Figcaption, Superscript, Subscript
- InlineCode, Strikethrough, Underline, CodeBlock

### Links & Buttons (4)
- Link, LinkBlock, TextLink, Button

### Lists (3)
- List, ListItem, ListUnstyled

### Media (4)
- Image, Video, BackgroundVideoWrapper, HtmlEmbed

### Navbar (6)
- NavbarWrapper, NavbarBrand, NavbarMenu, NavbarLink, NavbarButton, HamburgerIcon

### Dropdown (7)
- DropdownWrapper, DropdownToggle, DropdownList, DropdownLink
- AccordionItem, AccordionTrigger, AccordionContent

### Tabs (5)
- TabsWrapper, TabsMenu, TabsLink, TabsContent, TabsPane

### Swiper (6)
- SwiperSlider, SwiperSlide, SwiperNavPrev, SwiperNavNext, SwiperPagination, SwiperScrollbar

### Forms (17)
- FormWrapper, FormForm, FormTextInput, FormTextarea, FormSelect, FormButton
- FormCheckboxWrapper, FormCheckboxInput, FormRadioWrapper, FormRadioInput
- FormBlockLabel, FormInlineLabel, FormSuccessMessage, FormErrorMessage
- FormFileUploadWrapper, FormFileUploadInput, FormReCaptcha

### CMS (11)
- DynamoWrapper, DynamoList, DynamoItem, DynamoEmpty
- SearchForm, SearchInput, SearchButton, SearchResults
- LightboxWrapper, LightboxLink, MapWidget

### Other (1)
- ErrorBoundary

---

## Breakpoints

```typescript
const BREAKPOINTS = {
  desktop: { min: 992 },
  tablet: { max: 991, min: 480 },
  mobile: { max: 479 },
} as const;

// Legacy aliases (for compatibility)
const BREAKPOINT_ALIASES = {
  main: 'desktop',
  medium: 'tablet',
  small: 'mobile',
  tiny: 'mobile',
} as const;
```

---

## Migration Path for Backend

### Before (scattered)
```typescript
// generators/webflow/types.ts
function getDefaultTag(compType: string): string {
  switch (compType) {
    case 'Section': return 'section';
    case 'Heading': return 'h2';
    // ... 80+ cases
  }
}

// services/webflow-preview-importer.ts
const WEBFLOW_TYPE_TO_CLASSES: Record<string, string[]> = {
  'Container': ['w-container'],
  'Row': ['w-row'],
  // ... 15+ entries
};

// prompts/workflow/build-styles/index.ts
if (rawComb === '' || rawComb === '&') {
  style.comb = rawComb;
} else {
  style.comb = '&';
}
```

### After (unified)
```typescript
import {
  getDefaultTag,
  getWebflowClasses,
  normalizeComb,
  BREAKPOINTS,
} from '@upbuilder/react-framework';

// All mappings come from framework
const tag = getDefaultTag('Section');           // 'section'
const classes = getWebflowClasses('Container'); // ['w-container']
const comb = normalizeComb(rawComb);            // '' or '&'
```

---

## Success Criteria

1. ✅ All component definitions in `COMPONENT_REGISTRY`
2. ✅ `webflow-defaults` uses registry (no duplication)
3. ✅ Utilities exported: `normalizeComb`, `getMediaQuery`, `BREAKPOINTS`
4. ✅ Types exported: `Breakpoint`, `PseudoState`, `ComponentSettings`
5. ✅ Package exports updated for direct imports
6. 🔄 Backend can import and use (future migration)

---

## Execution Order

1. [x] Create `src/types.ts` - DONE
2. [x] Create `src/registry.ts` - DONE
3. [x] Update `src/index.ts` - DONE
4. [x] Update `webflow-defaults/index.ts` - DONE
5. [x] Update `package.json` - DONE
6. [x] Test build - DONE (backendv2 builds successfully)
7. [x] Verify backendv2 can import - DONE (type checks pass)

---

## Migration Examples

### Example 1: Replace getDefaultTag in backend

**Before** (in `backendv2/src/generators/webflow/types.ts`):
```typescript
export function getDefaultTag(compType: string): string {
  switch (compType) {
    case 'Section': return 'section';
    case 'Heading': return 'h2';
    case 'Image': return 'img';
    // ... 80+ more cases
  }
  return 'div';
}
```

**After**:
```typescript
import { getDefaultTag } from '@upbuilder/react-framework';
// Or: import { getDefaultTag } from '@upbuilder/react-framework/registry';
// That's it - the function is already available!
```

### Example 2: Replace WEBFLOW_TYPE_TO_CLASSES in import

**Before** (in `backendv2/src/services/webflow-preview-importer.ts`):
```typescript
const WEBFLOW_TYPE_TO_CLASSES: Record<string, string[]> = {
  'Container': ['w-container'],
  'Row': ['w-row'],
  'Column': ['w-col'],
  'NavbarWrapper': ['w-nav'],
  // ...
};

function deriveLegacyLayoutClasses(raw: any) {
  const classes = WEBFLOW_TYPE_TO_CLASSES[raw.type] ?? [];
  // ...
}
```

**After**:
```typescript
import { getWebflowClasses } from '@upbuilder/react-framework';

function deriveLegacyLayoutClasses(raw: any) {
  const classes = getWebflowClasses(raw.type);
  // ...
}
```

### Example 3: Replace normalizeComb in parsers

**Before** (in multiple files):
```typescript
if (rawComb === '' || rawComb === '&') {
  style.comb = rawComb;
} else {
  console.warn(`Invalid comb value "${rawComb}"...`);
  style.comb = '&';
}
```

**After**:
```typescript
import { normalizeComb } from '@upbuilder/react-framework';

style.comb = normalizeComb(rawComb);
```

### Example 4: Use BREAKPOINTS constant

**Before**:
```typescript
// Hardcoded in multiple files
const TABLET_MAX = 991;
const MOBILE_MAX = 479;

function getMediaQuery(breakpoint: string): string {
  if (breakpoint === 'tablet') return `@media (max-width: 991px)`;
  if (breakpoint === 'mobile') return `@media (max-width: 479px)`;
  return '';
}
```

**After**:
```typescript
import { BREAKPOINTS, getMediaQuery } from '@upbuilder/react-framework';

// Access constants
const tabletMax = BREAKPOINTS.tablet.max; // 991

// Generate media queries
const mq = getMediaQuery('tablet'); // '@media (max-width: 991px)'
```

### Example 5: Validate component types

**Before**:
```typescript
const VALID_TYPES = ['Block', 'Section', 'Heading', ...]; // manual list

function isValidType(type: string): boolean {
  return VALID_TYPES.includes(type);
}
```

**After**:
```typescript
import { isValidComponentType, getAllComponentTypes } from '@upbuilder/react-framework';

// Check validity
isValidComponentType('Block'); // true
isValidComponentType('Foo');   // false

// Get all types
const allTypes = getAllComponentTypes(); // ['Block', 'Section', ...]
```

---

## Notes

- Keep React components unchanged (they work fine)
- Registry is data-only, no React dependency
- Types are TypeScript-only, work in both browser and Node
- Backward compatible - existing imports still work
