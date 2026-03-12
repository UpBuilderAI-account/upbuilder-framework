# UpBuilder React Framework Components

Documentation for `@upbuilder/react-framework` components, organized for docs-site usage.

## Scope

Included:
- Layout and wrappers
- Typography and text formatting
- Links and button components
- Media and embed components
- Navigation
- Dropdown and accordion
- Tabs
- Swiper slider
- Forms

Excluded for now:
- CMS/Dynamic components (`cms.tsx`)
- Utility helpers (`utils.ts`)
- Error boundary docs

## Install and Import

```tsx
import {
  Block,
  Section,
  Heading,
  Paragraph,
  NavbarWrapper,
  DropdownWrapper,
  TabsWrapper,
  SwiperSlider,
  FormWrapper,
} from '@upbuilder/react-framework';
```

## Conventions

- Most components accept `className`, `children`, and pass-through HTML attributes (`[key: string]: any`).
- Many components add Webflow-compatible classes (example: `w-nav`, `w-button`, `w-form`).
- Content props (`text`, `code`, etc.) are usually used when `children` is not provided.

## Component Index

### Layout and Wrappers

- `Block`
- `Section`
- `BlockContainer`
- `Row`
- `Column`
- `Grid`
- `HFlex`
- `VFlex`

### Typography and Text

- `Heading`
- `Paragraph`
- `Span`
- `Blockquote`
- `RichText`
- `Figure`
- `Figcaption`
- `Strong`
- `Emphasized`
- `Superscript`
- `Subscript`
- `InlineCode`
- `Strikethrough`
- `Underline`

### Links and Buttons

- `Link`
- `LinkBlock`
- `TextLink`
- `Button`

### Media and Embed

- `Image`
- `Video`
- `HtmlEmbed`
- `CodeBlock`
- `LineBreak`
- `BackgroundVideoWrapper`
- `BackgroundVideoPlayPauseButton`
- `BackgroundVideoPlayPauseButtonPlaying`
- `BackgroundVideoPlayPauseButtonPaused`
- `HamburgerIcon`
- `List`
- `ListItem`

### Navigation

- `NavbarWrapper`
- `NavbarContainer` (deprecated)
- `NavbarBrand`
- `NavbarMenu`
- `NavbarLink`
- `NavbarButton`

### Dropdown and Accordion

- `DropdownWrapper`
- `DropdownToggle`
- `DropdownList`
- `DropdownLink`
- `AccordionItem`
- `AccordionTrigger`
- `AccordionContent`

### Tabs

- `TabsWrapper`
- `TabsMenu`
- `TabsContent`
- `TabsLink`
- `TabsPane`

### Swiper Slider

- `SwiperSlider`
- `SwiperSlide`
- `SwiperNavPrev`
- `SwiperNavNext`
- `SwiperPagination`
- `SwiperScrollbar`

### Forms

- `FormWrapper`
- `FormForm`
- `FormBlockLabel`
- `FormInlineLabel`
- `FormTextInput`
- `FormTextarea`
- `FormSelect`
- `FormButton`
- `FormCheckboxWrapper`
- `FormCheckboxInput`
- `FormRadioWrapper`
- `FormRadioInput`
- `FormSuccessMessage`
- `FormErrorMessage`
- `FormFileUploadWrapper`
- `FormFileUploadDefault`
- `FormFileUploadUploading`
- `FormFileUploadSuccess`
- `FormFileUploadError`
- `FormFileUploadInput`
- `FormFileUploadLabel`
- `FormFileUploadErrorMsg`
- `FormReCaptcha`

---

## Layout and Wrappers

## `Block`
Universal wrapper with configurable HTML tag.

- Key props:
- `tag?: keyof JSX.IntrinsicElements` (default: `div`)
- `animate?: string`
- Output:
- Renders selected tag with `data-animate={animate}`.

## `Section`
Section wrapper.

- Key props:
- `animate?: string`
- Output:
- Renders `<section>` with `data-animate={animate}`.

## `BlockContainer`
Simple container wrapper.

- Output:
- Renders `<div>`.

## `Row`
Row layout wrapper.

- Output:
- Renders `<div>` with appended class `w-row`.

## `Column`
Column layout wrapper.

- Output:
- Renders `<div>` with appended class `w-col`.

## `Grid`
Grid wrapper.

- Output:
- Renders `<div>`.

## `HFlex`
Horizontal flex wrapper.

- Output:
- Renders `<div>` with inline style `display:flex; flex-direction:row`.

## `VFlex`
Vertical flex wrapper.

- Output:
- Renders `<div>` with inline style `display:flex; flex-direction:column`.

---

## Typography and Text

All text components support `text?: string` and/or `children`.

Behavior:
- If `children` exists, children render first.
- Otherwise `text` renders.
- Newlines in `text` are converted to `<br />`.

## `Heading`

- Key props:
- `as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` (default: `h2`)
- `text?: string`

## `Paragraph`
Renders `<p>`.

## `Span`
Renders `<span>`.

## `Blockquote`
Renders `<blockquote>`.

## `RichText`
Rich text wrapper.

- Output:
- Renders `<div>` with appended class `w-richtext`.

## `Figure`
Renders `<figure>`.

## `Figcaption`
Renders `<figcaption>`.

## `Strong`
Renders `<strong>`.

## `Emphasized`
Renders `<em>`.

## `Superscript`
Renders `<sup>`.

## `Subscript`
Renders `<sub>`.

## `InlineCode`
Renders `<code>`.

## `Strikethrough`
Renders `<s>`.

## `Underline`
Renders `<u>`.

---

## Links and Buttons

## `Link`
Standard link.

- Key props:
- `href?: string` (default: `#`)
- `target?: '_blank' | '_self' | '_parent' | '_top'`

## `LinkBlock`
Block-level link.

- Output:
- Renders `<a>` with appended class `w-inline-block`.

## `TextLink`
Text-oriented link variant.

- Output:
- Renders `<a>`.

## `Button`
Button component.

- Key props:
- `type?: 'button' | 'submit' | 'reset'` (default: `button`)
- Output:
- Renders `<button>` with appended class `w-button`.

---

## Media and Embed

## `Image`
Image wrapper.

- Key props:
- `src?: string`
- `alt?: string` (default: empty string)
- Output:
- Renders `<img loading="lazy" />`.

## `Video`
Embedded video wrapper for YouTube/Vimeo URLs.

- Key props:
- `videoUrl?: string`
- `videoTitle?: string` (default: `Video`)
- Output:
- Renders wrapper `<div class="... w-video">` and an `<iframe>`.
- URL normalization:
- Converts `youtube.com/watch?v=...` to embed URL.
- Converts `vimeo.com/...` to player URL.

## `HtmlEmbed`
Raw HTML embed.

- Key props:
- `html?: string`
- Output:
- Uses `dangerouslySetInnerHTML`.

## `CodeBlock`
Code snippet block.

- Key props:
- `code?: string`
- `language?: string`
- Output:
- Renders `<pre><code class="language-...">`.

## `LineBreak`
Renders `<br />`.

## `HamburgerIcon`
Webflow-style hamburger icon element.

- Output:
- Renders wrapper with class `w-icon-nav-menu` and inline SVG.
- Intended usage:
- Place inside `NavbarButton`.

## `List`
List wrapper.

- Key props:
- `ordered?: boolean`
- Output:
- Renders `<ul>` or `<ol>`.

## `ListItem`
List item.

- Key props:
- `text?: string`
- Output:
- Renders `<li>`.

## `BackgroundVideoWrapper`
Background video container.

- Key props:
- `videoUrl?: string`
- `settings?: { autoplay?: boolean; loop?: boolean; muted?: boolean; controls?: boolean; poster?: string }`
- Output:
- Renders wrapper `<div class="... w-background-video">`.
- If `videoUrl` exists, renders a positioned `<video><source type="video/mp4" /></video>`.

## `BackgroundVideoPlayPauseButton`
## `BackgroundVideoPlayPauseButtonPlaying`
## `BackgroundVideoPlayPauseButtonPaused`
Pass-through button-state wrappers (all render `<div>`).

---

## Navigation

Important:
- `NavbarBrand`, `NavbarMenu`, `NavbarLink`, and `NavbarButton` must be used under `NavbarWrapper`.

## `NavbarWrapper`
Main navbar container with open/close state and responsive collapse behavior.

- Key props:
- `collapse?: 'small' | 'medium' | 'all'`
- `settings?: { collapseAt?: 'medium' | 'small' | 'none'; animation?: 'default' | 'over-left' | 'over-right'; animationDuration?: number; dropdownMode?: 'hover' | 'click'; dropdownDelay?: number }`
- Output:
- Renders `<div class="... w-nav">`.
- Sets attributes:
- `data-collapse`
- `data-animation`
- `data-duration`
- `role="banner"`
- Adds mobile overlay element when menu is open.

## `NavbarContainer` (deprecated)
Simple `<div>` wrapper. Prefer `Block`.

## `NavbarBrand`
Brand/home link.

- Output:
- Renders `<a class="... w-nav-brand" aria-label="home">`.

## `NavbarMenu`
Menu container.

- Output:
- Renders `<nav class="... w-nav-menu ...">`.
- Adds `w--open` when open.

## `NavbarLink`
Menu link.

- Key props:
- `text?: string`
- `href?: string` (default: `#`)
- `isActive?: boolean`
- Output:
- Renders `<a class="... w-nav-link ...">`.
- Adds `w--nav-link-open` when menu is open.
- Sets `aria-current="page"` when active.
- Click closes mobile menu.

## `NavbarButton`
Menu toggle button.

- Output:
- Renders `<div class="... w-nav-button ...">`.
- Adds `w--open` when open.
- Accessibility attrs:
- `role="button"`, `tabIndex={0}`, `aria-expanded`, `aria-label="menu"`, `aria-haspopup="menu"`.
- Behavior:
- Click toggles menu state.
- Uses fallback SVG icon if no children.

---

## Dropdown and Accordion

Important:
- `DropdownToggle`, `DropdownList`, and `DropdownLink` must be used under `DropdownWrapper`.

## `DropdownWrapper`
Stateful dropdown container.

- Key props:
- `accordion?: boolean` (forces click-mode behavior)
- `hover?: boolean`
- `delay?: number` (default: `200`)
- `startOpen?: boolean`
- Output:
- Renders `<div class="... w-dropdown ...">`.
- Adds `w--open` when open.
- Sets `data-hover` and `data-open`.
- Behavior:
- Supports hover open/close with delay.
- Closes on outside click.

## `DropdownToggle`
Toggle trigger.

- Key props:
- `text?: string`
- Output:
- Renders `<div class="... w-dropdown-toggle">`.
- Attributes:
- `role="button"`, `aria-expanded`, `aria-haspopup="true"`.

## `DropdownList`
Dropdown menu list.

- Output:
- Renders `<nav class="... w-dropdown-list ..." role="menu">`.
- Adds `w--open` when open.

## `DropdownLink`
Dropdown item link.

- Key props:
- `text?: string`
- `href?: string` (default: `#`)
- Output:
- Renders `<a class="... w-dropdown-link" role="menuitem">`.
- Behavior:
- Closes dropdown on click in non-accordion mode.

## `AccordionItem`
Accordion adapter built on `DropdownWrapper`.

- Key props:
- `defaultOpen?: boolean`
- Behavior:
- Renders `DropdownWrapper` with `accordion` enabled.

## `AccordionTrigger`
Alias wrapper around `DropdownToggle`.

## `AccordionContent`
Alias wrapper around `DropdownList`.

---

## Tabs

Important:
- `TabsMenu`, `TabsContent`, `TabsLink`, `TabsPane` must be used under `TabsWrapper`.

## `TabsWrapper`
Main tabs state container.

- Key props:
- `defaultTab?: string`
- `fadeIn?: number` (accepted)
- `fadeOut?: number` (accepted)
- `easing?: string` (accepted)
- Output:
- Renders `<div class="... w-tabs">`.
- Behavior:
- Collects tab names from `TabsMenu` children.
- Manages active tab/index state.

## `TabsMenu`
Tab links container.

- Output:
- Renders `<div class="... w-tab-menu" role="tablist">`.

## `TabsContent`
Tab panes container.

- Output:
- Renders `<div class="... w-tab-content">`.

## `TabsLink`
Tab trigger control.

- Key props:
- `tabName?: string`
- `isActive?: boolean` (manual override)
- `text?: string`
- Output:
- Renders `<button class="... w-tab-link ..." role="tab">`.
- Adds `w--current` when active.
- Sets `aria-selected`.

## `TabsPane`
Tab panel.

- Key props:
- `tabName?: string`
- `isActive?: boolean` (manual override)
- Output:
- Renders `<div class="... w-tab-pane ..." role="tabpanel">`.
- Adds `w--tab-active` when active.
- Uses inline `display: block|none` and `aria-hidden`.

---

## Swiper Slider

## `SwiperSlider`
Main Swiper wrapper with controls, effects, autoplay, and responsive config.

- Key props:
- Core:
- `slidesPerView?: number | 'auto'` (default: `1`)
- `spaceBetween?: number` (default: `0`)
- `direction?: 'horizontal' | 'vertical'` (default: `horizontal`)
- `loop?: boolean` (default: `true`)
- `speed?: number` (default: `300`)
- `initialSlide?: number` (default: `0`)
- `slidesPerGroup?: number` (default: `1`)
- Interaction:
- `allowTouchMove?: boolean` (default: `true`)
- `grabCursor?: boolean` (default: `false`)
- `freeMode?: boolean` (default: `false`)
- `centeredSlides?: boolean` (default: `false`)
- Behavior:
- `autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean; pauseOnMouseEnter?: boolean }`
- `effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative'`
- `navigation?: boolean`
- `pagination?: boolean | { type?: 'bullets' | 'fraction' | 'progressbar'; clickable?: boolean }`
- `scrollbar?: boolean | { draggable?: boolean }`
- Responsive:
- `breakpoints?: Record<number, Partial<SwiperOptions>>`
- Output:
- Wrapper `<div class="... swiper" data-swiper-container="true">`.
- Internally wires custom controls (`SwiperNavPrev`, `SwiperNavNext`, `SwiperPagination`, `SwiperScrollbar`) via refs.

## `SwiperSlide`
Slide wrapper.

- Output:
- Renders `<div class="... swiper-slide" data-swiper-slide="true">`.

## `SwiperNavPrev`
Previous button component.

- Output:
- Renders `<div data-swiper-nav="prev" role="button" tabIndex={0} aria-label="Previous slide">`.

## `SwiperNavNext`
Next button component.

- Output:
- Renders `<div data-swiper-nav="next" role="button" tabIndex={0} aria-label="Next slide">`.

## `SwiperPagination`
Pagination container.

- Output:
- Renders `<div data-swiper-pagination="true">`.

## `SwiperScrollbar`
Scrollbar container.

- Output:
- Renders `<div data-swiper-scrollbar="true">`.

---

## Forms

## `FormWrapper`
Form shell wrapper.

- Output:
- Renders `<div class="... w-form">`.

## `FormForm`
Actual form element.

- Key props:
- `name?: string`
- `action?: string`
- `method?: string` (default: `post`)
- `onSubmit?: (e) => void`
- Behavior:
- Prevents default browser submit and then calls `onSubmit` if provided.

## `FormBlockLabel`
## `FormInlineLabel`
Label components.

- Key props:
- `htmlFor?: string`
- `text?: string`
- `FormInlineLabel` adds inline display style.

## `FormTextInput`
Text input.

- Key props:
- `type?: string` (default: `text`)
- `name?: string`
- `placeholder?: string`
- `required?: boolean`
- `value?: string` (mapped to `defaultValue`)
- `onChange?: (e) => void`
- Output:
- Adds class `w-input`.

## `FormTextarea`
Textarea input.

- Key props:
- `name?: string`
- `placeholder?: string`
- `required?: boolean`
- `value?: string` (mapped to `defaultValue`)
- `onChange?: (e) => void`
- Output:
- Adds class `w-input`.

## `FormSelect`
Select input.

- Key props:
- `name?: string`
- `required?: boolean`
- `onChange?: (e) => void`
- Output:
- Adds class `w-select`.

## `FormButton`
Form button.

- Key props:
- `type?: 'button' | 'submit' | 'reset'` (default: `submit`)
- `text?: string`
- Output:
- Adds class `w-button`.

## `FormCheckboxWrapper`
Checkbox label wrapper.

- Output:
- Renders `<label class="... w-checkbox">`.

## `FormCheckboxInput`
Checkbox input.

- Key props:
- `name?: string`
- `required?: boolean`
- `onChange?: (e) => void`

## `FormRadioWrapper`
Radio label wrapper.

- Output:
- Renders `<label class="... w-radio">`.

## `FormRadioInput`
Radio input.

- Key props:
- `name?: string`
- `value?: string`
- `required?: boolean`
- `onChange?: (e) => void`

## `FormSuccessMessage`
Success state message block.

- Output:
- Adds class `w-form-done`.
- Default text: `Thank you! Your submission has been received!`

## `FormErrorMessage`
Error state message block.

- Output:
- Adds class `w-form-fail`.
- Default text: `Oops! Something went wrong.`

## `FormFileUploadWrapper`
## `FormFileUploadDefault`
## `FormFileUploadUploading`
## `FormFileUploadSuccess`
## `FormFileUploadError`
Light wrappers for file-upload states (render `<div>` pass-through containers).

## `FormFileUploadInput`
File input.

- Key props:
- `name?: string`
- `accept?: string`
- `onChange?: (e) => void`

## `FormFileUploadLabel`
## `FormFileUploadErrorMsg`
File-upload text blocks.

- Key props:
- `text?: string`

## `FormReCaptcha`
reCAPTCHA placeholder.

- Key props:
- `siteKey?: string`
- Output:
- Renders `<div data-sitekey={siteKey}>`.

---

## Attribute and Class Quick Notes

Webflow-style classes used by components:
- `w-nav`, `w-nav-menu`, `w-nav-link`, `w-nav-button`, `w-nav-brand`
- `w-dropdown`, `w-dropdown-toggle`, `w-dropdown-list`, `w-dropdown-link`
- `w-tabs`, `w-tab-menu`, `w-tab-content`, `w-tab-link`, `w-tab-pane`
- `w-form`, `w-input`, `w-select`, `w-button`, `w-checkbox`, `w-radio`, `w-form-done`, `w-form-fail`
- `w-richtext`, `w-video`, `w-background-video`, `w-inline-block`, `w-row`, `w-col`

Data attributes used by components:
- `data-animate`
- `data-collapse`, `data-animation`, `data-duration`
- `data-hover`, `data-open`
- `data-swiper-container`, `data-swiper-slide`, `data-swiper-nav`, `data-swiper-pagination`, `data-swiper-scrollbar`
- `data-sitekey`

## Source Files

- `src/base.tsx`
- `src/typography.tsx`
- `src/navigation.tsx`
- `src/dropdown.tsx`
- `src/tabs.tsx`
- `src/swiper.tsx`
- `src/forms.tsx`
