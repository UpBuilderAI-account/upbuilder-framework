# UpBuilder React Framework - Component Reference

This document shows the correct usage of ALL framework components.
**IMPORTANT:** Only use components from `@upbuilder/react-framework`. Never use raw HTML elements.

---

## Table of Contents

1. [Base Components](#base-components)
2. [Typography Components](#typography-components)
3. [Link & Button Components](#link--button-components)
4. [List Components](#list-components)
5. [Layout Components](#layout-components)
6. [Navbar Components](#navbar-components)
7. [Dropdown & Accordion Components](#dropdown--accordion-components)
8. [Tabs Components](#tabs-components)
9. [Swiper Slider Components](#swiper-slider-components)
10. [Form Components](#form-components)
11. [Media Components](#media-components)
12. [CMS Components](#cms-components)

---

## Base Components

### Block (replaces `<div>`)

```tsx
import { Block } from '@upbuilder/react-framework';

// Basic div
<Block className="my-class">Content</Block>

// With custom tag
<Block tag="article" className="article-wrapper">Article content</Block>
<Block tag="aside" className="sidebar">Sidebar content</Block>
<Block tag="header" className="site-header">Header content</Block>
<Block tag="footer" className="site-footer">Footer content</Block>
<Block tag="main" className="main-content">Main content</Block>
<Block tag="figure" className="figure-wrapper">Figure content</Block>
<Block tag="figcaption" className="figure-caption">Caption text</Block>
<Block tag="address" className="contact-info">Address content</Block>
<Block tag="blockquote" className="quote">Quote text</Block>
```

### Section (replaces `<section>`)

```tsx
import { Section } from '@upbuilder/react-framework';

<Section className="section_hero">
  <Block className="padding-global padding-section-large">
    <Block className="container-large">
      {/* Section content */}
    </Block>
  </Block>
</Section>
```

### BlockContainer

```tsx
import { BlockContainer } from '@upbuilder/react-framework';

<BlockContainer className="wrapper">
  {/* Container content */}
</BlockContainer>
```

---

## Typography Components

### Heading (replaces `<h1>` - `<h6>`)

```tsx
import { Heading } from '@upbuilder/react-framework';

<Heading as="h1" className="heading-style-h1">Main Title</Heading>
<Heading as="h2" className="heading-style-h2">Section Title</Heading>
<Heading as="h3" className="heading-style-h3">Subsection Title</Heading>
<Heading as="h4" className="heading-style-h4">Minor Heading</Heading>
<Heading as="h5" className="heading-style-h5">Small Heading</Heading>
<Heading as="h6" className="heading-style-h6">Smallest Heading</Heading>

// With text prop (alternative to children)
<Heading as="h1" text="Main Title" className="heading-style-h1" />
```

### Paragraph (replaces `<p>`)

```tsx
import { Paragraph } from '@upbuilder/react-framework';

<Paragraph className="text-size-regular">
  This is a paragraph of text.
</Paragraph>

// With text prop
<Paragraph text="This is paragraph text." className="text-size-regular" />
```

### Span (replaces `<span>`)

```tsx
import { Span } from '@upbuilder/react-framework';

<Span className="text-highlight">Highlighted text</Span>

// Inside a paragraph for inline styling
<Paragraph className="text-size-regular">
  Regular text with <Span className="text-bold">bold inline</Span> text.
</Paragraph>
```

### Text Formatting (replaces `<strong>`, `<em>`, `<sup>`, `<sub>`, `<code>`, `<s>`, `<u>`)

```tsx
import {
  Strong,
  Emphasized,
  Superscript,
  Subscript,
  InlineCode,
  Strikethrough,
  Underline
} from '@upbuilder/react-framework';

<Strong>Bold text</Strong>           // replaces <strong>, <b>
<Emphasized>Italic text</Emphasized> // replaces <em>, <i>
<Superscript>2</Superscript>         // replaces <sup>
<Subscript>2</Subscript>             // replaces <sub>
<InlineCode>code</InlineCode>        // replaces <code>
<Strikethrough>deleted</Strikethrough> // replaces <s>, <del>, <strike>
<Underline>underlined</Underline>    // replaces <u>, <ins>
```

### Blockquote (replaces `<blockquote>`)

```tsx
import { Blockquote } from '@upbuilder/react-framework';

<Blockquote className="testimonial-quote">
  "This is a quote from someone important."
</Blockquote>
```

### RichText (for formatted content blocks)

```tsx
import { RichText } from '@upbuilder/react-framework';

<RichText className="article-content">
  <Heading as="h3">Article Title</Heading>
  <Paragraph>First paragraph...</Paragraph>
  <Paragraph>Second paragraph...</Paragraph>
</RichText>
```

### Figure & Figcaption

```tsx
import { Figure, Figcaption, Image } from '@upbuilder/react-framework';

<Figure className="image-figure">
  <Image src="photo.jpg" alt="Description" className="figure-image" />
  <Figcaption className="figure-caption">Image caption text</Figcaption>
</Figure>
```

### LineBreak (replaces `<br>`)

```tsx
import { LineBreak } from '@upbuilder/react-framework';

<Paragraph>
  First line
  <LineBreak />
  Second line
</Paragraph>
```

### CodeBlock (replaces `<pre><code>`)

```tsx
import { CodeBlock } from '@upbuilder/react-framework';

<CodeBlock
  code="const x = 42;"
  language="javascript"
  className="code-snippet"
/>
```

---

## Link & Button Components

### Link (replaces `<a>`)

```tsx
import { Link } from '@upbuilder/react-framework';

// Basic link
<Link href="/about" className="nav-link">About Us</Link>

// External link
<Link href="https://example.com" target="_blank" className="external-link">
  Visit Site
</Link>

// With text prop
<Link href="/contact" text="Contact Us" className="contact-link" />
```

### LinkBlock (clickable block/card)

```tsx
import { LinkBlock, Image, Heading } from '@upbuilder/react-framework';

<LinkBlock href="/article/1" className="card-link">
  <Image src="thumbnail.jpg" alt="Article" className="card-image" />
  <Heading as="h3" className="card-title">Article Title</Heading>
</LinkBlock>
```

### TextLink (inline text link)

```tsx
import { TextLink } from '@upbuilder/react-framework';

<Paragraph>
  Read more on our <TextLink href="/docs">documentation page</TextLink>.
</Paragraph>
```

### Button (replaces `<button>`)

```tsx
import { Button } from '@upbuilder/react-framework';

<Button className="button is-primary">Click Me</Button>
<Button text="Submit" className="button is-secondary" />
```

---

## List Components

### List & ListItem (replaces `<ul>`, `<ol>`, `<li>`)

```tsx
import { List, ListItem } from '@upbuilder/react-framework';

// Unordered list
<List className="feature-list">
  <ListItem className="feature-item">Feature one</ListItem>
  <ListItem className="feature-item">Feature two</ListItem>
  <ListItem className="feature-item">Feature three</ListItem>
</List>

// Ordered list
<List ordered className="steps-list">
  <ListItem className="step-item">Step one</ListItem>
  <ListItem className="step-item">Step two</ListItem>
  <ListItem className="step-item">Step three</ListItem>
</List>
```

---

## Layout Components

### Grid

```tsx
import { Grid, Block } from '@upbuilder/react-framework';

<Grid className="features-grid">
  <Block className="grid-item">Item 1</Block>
  <Block className="grid-item">Item 2</Block>
  <Block className="grid-item">Item 3</Block>
</Grid>
```

### Row & Column (Webflow's legacy grid)

```tsx
import { Row, Column } from '@upbuilder/react-framework';

<Row className="content-row">
  <Column className="w-col-6">Left column</Column>
  <Column className="w-col-6">Right column</Column>
</Row>
```

### HFlex & VFlex (flex containers)

```tsx
import { HFlex, VFlex } from '@upbuilder/react-framework';

// Horizontal flex (row)
<HFlex className="button-group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</HFlex>

// Vertical flex (column)
<VFlex className="card-content">
  <Heading as="h3">Title</Heading>
  <Paragraph>Description</Paragraph>
</VFlex>
```

---

## Navbar Components

### Complete Navbar Example

```tsx
import {
  NavbarWrapper,
  NavbarBrand,
  NavbarMenu,
  NavbarLink,
  NavbarButton,
  HamburgerIcon,
  Block,
  Image,
  Link,
  DropdownWrapper,
  DropdownToggle,
  DropdownList,
  DropdownLink,
} from '@upbuilder/react-framework';

<NavbarWrapper className="navbar" collapse="medium">
  <Block className="navbar_container">
    {/* Logo */}
    <NavbarBrand href="/" className="navbar_brand">
      <Image src="logo.svg" alt="Logo" className="navbar_logo" />
    </NavbarBrand>

    {/* Navigation Menu */}
    <NavbarMenu className="navbar_menu">
      <NavbarLink href="/" text="Home" className="navbar_link" />
      <NavbarLink href="/about" text="About" className="navbar_link" />

      {/* Dropdown in navbar */}
      <DropdownWrapper hover className="navbar_dropdown">
        <DropdownToggle className="navbar_dropdown-toggle">
          Services
        </DropdownToggle>
        <DropdownList className="navbar_dropdown-list">
          <DropdownLink href="/services/web" text="Web Design" />
          <DropdownLink href="/services/seo" text="SEO" />
        </DropdownList>
      </DropdownWrapper>

      <NavbarLink href="/contact" text="Contact" className="navbar_link" />
    </NavbarMenu>

    {/* CTA Button (desktop) */}
    <Link href="/get-started" className="button is-primary navbar_cta">
      Get Started
    </Link>

    {/* Mobile Menu Button */}
    <NavbarButton className="navbar_menu-button">
      <HamburgerIcon />
    </NavbarButton>
  </Block>
</NavbarWrapper>
```

---

## Dropdown & Accordion Components

### Dropdown (hover or click)

```tsx
import {
  DropdownWrapper,
  DropdownToggle,
  DropdownList,
  DropdownLink,
} from '@upbuilder/react-framework';

// Hover dropdown
<DropdownWrapper hover className="dropdown">
  <DropdownToggle className="dropdown_toggle">
    Menu
  </DropdownToggle>
  <DropdownList className="dropdown_list">
    <DropdownLink href="/option1" text="Option 1" />
    <DropdownLink href="/option2" text="Option 2" />
    <DropdownLink href="/option3" text="Option 3" />
  </DropdownList>
</DropdownWrapper>

// Click dropdown
<DropdownWrapper className="dropdown">
  <DropdownToggle className="dropdown_toggle">
    Click Me
  </DropdownToggle>
  <DropdownList className="dropdown_list">
    <DropdownLink href="/item1" text="Item 1" />
    <DropdownLink href="/item2" text="Item 2" />
  </DropdownList>
</DropdownWrapper>
```

### Accordion (FAQ Section)

```tsx
import {
  DropdownWrapper,
  DropdownToggle,
  DropdownList,
  Block,
  Heading,
  Paragraph,
} from '@upbuilder/react-framework';

// Using DropdownWrapper with accordion prop for FAQ
<Block className="faq_list">
  <DropdownWrapper accordion className="faq_item">
    <DropdownToggle className="faq_question">
      <Heading as="h3" className="faq_question-text">
        What is your return policy?
      </Heading>
      <Block className="faq_icon">+</Block>
    </DropdownToggle>
    <DropdownList className="faq_answer">
      <Paragraph>
        We offer a 30-day money-back guarantee on all products.
      </Paragraph>
    </DropdownList>
  </DropdownWrapper>

  <DropdownWrapper accordion className="faq_item">
    <DropdownToggle className="faq_question">
      <Heading as="h3" className="faq_question-text">
        How do I contact support?
      </Heading>
      <Block className="faq_icon">+</Block>
    </DropdownToggle>
    <DropdownList className="faq_answer">
      <Paragraph>
        You can reach us at support@example.com.
      </Paragraph>
    </DropdownList>
  </DropdownWrapper>
</Block>
```

---

## Tabs Components

### Complete Tabs Example

```tsx
import {
  TabsWrapper,
  TabsMenu,
  TabsLink,
  TabsContent,
  TabsPane,
  Block,
  Heading,
  Paragraph,
} from '@upbuilder/react-framework';

<TabsWrapper className="tabs_wrapper">
  {/* Tab buttons */}
  <TabsMenu className="tabs_menu">
    <TabsLink tabName="tab1" className="tabs_link">Tab 1</TabsLink>
    <TabsLink tabName="tab2" className="tabs_link">Tab 2</TabsLink>
    <TabsLink tabName="tab3" className="tabs_link">Tab 3</TabsLink>
  </TabsMenu>

  {/* Tab content panels */}
  <TabsContent className="tabs_content">
    <TabsPane tabName="tab1" className="tabs_pane">
      <Heading as="h3">First Tab Content</Heading>
      <Paragraph>Content for the first tab.</Paragraph>
    </TabsPane>
    <TabsPane tabName="tab2" className="tabs_pane">
      <Heading as="h3">Second Tab Content</Heading>
      <Paragraph>Content for the second tab.</Paragraph>
    </TabsPane>
    <TabsPane tabName="tab3" className="tabs_pane">
      <Heading as="h3">Third Tab Content</Heading>
      <Paragraph>Content for the third tab.</Paragraph>
    </TabsPane>
  </TabsContent>
</TabsWrapper>
```

---

## Swiper Slider Components

Uses the **Swiper** library - fully customizable with NO CSS restrictions!

### Complete Slider/Carousel Example

```tsx
import {
  SwiperSlider,
  SwiperSlide,
  SwiperNavPrev,
  SwiperNavNext,
  SwiperPagination,
  Block,
  Image,
  Heading,
  Paragraph,
} from '@upbuilder/react-framework';

{/* Simple slider with auto-generated nav/pagination */}
<SwiperSlider
  className="testimonial-slider"
  navigation
  pagination
  autoplay
  loop
>
  <SwiperSlide className="slider_slide">
    <Block className="testimonial-card">
      <Image src="avatar1.jpg" alt="Customer" className="testimonial-avatar" />
      <Paragraph className="testimonial-text">
        "Amazing product! Highly recommended."
      </Paragraph>
      <Heading as="h4" className="testimonial-name">John Doe</Heading>
    </Block>
  </SwiperSlide>

  <SwiperSlide className="slider_slide">
    <Block className="testimonial-card">
      <Image src="avatar2.jpg" alt="Customer" className="testimonial-avatar" />
      <Paragraph className="testimonial-text">
        "Changed my life completely!"
      </Paragraph>
      <Heading as="h4" className="testimonial-name">Jane Smith</Heading>
    </Block>
  </SwiperSlide>

  <SwiperSlide className="slider_slide">
    <Block className="testimonial-card">
      <Image src="avatar3.jpg" alt="Customer" className="testimonial-avatar" />
      <Paragraph className="testimonial-text">
        "Best purchase I ever made."
      </Paragraph>
      <Heading as="h4" className="testimonial-name">Bob Wilson</Heading>
    </Block>
  </SwiperSlide>
</SwiperSlider>

{/* Advanced: Custom navigation placement */}
<SwiperSlider
  className="testimonial-slider"
  navigation
  slidesPerView={3}
  spaceBetween={20}
>
  <SwiperSlide>...</SwiperSlide>
  <SwiperSlide>...</SwiperSlide>
  <SwiperSlide>...</SwiperSlide>

  {/* Custom arrow placement */}
  <Block className="slider_arrows">
    <SwiperNavPrev className="slider_arrow-left">
      <Block className="arrow-icon">←</Block>
    </SwiperNavPrev>
    <SwiperNavNext className="slider_arrow-right">
      <Block className="arrow-icon">→</Block>
    </SwiperNavNext>
  </Block>

  {/* Custom pagination placement */}
  <SwiperPagination className="slider_dots" />
</SwiperSlider>
```

### SwiperSlider Props

| Prop | Type | Description |
|------|------|-------------|
| `slidesPerView` | `number \| 'auto'` | Slides visible at once (default: 1) |
| `spaceBetween` | `number` | Gap between slides in px |
| `loop` | `boolean` | Infinite loop |
| `autoplay` | `boolean \| object` | Auto-advance slides |
| `navigation` | `boolean` | Show prev/next arrows |
| `pagination` | `boolean \| object` | Show pagination dots |
| `effect` | `'slide' \| 'fade' \| 'cube' \| 'coverflow' \| 'flip'` | Transition effect |
| `direction` | `'horizontal' \| 'vertical'` | Slide direction |
| `centeredSlides` | `boolean` | Center active slide |
| `grabCursor` | `boolean` | Show grab cursor |

---

## Form Components

### Complete Contact Form Example

**CRITICAL:** Forms MUST use `FormWrapper` + `FormForm` structure for Webflow export.

```tsx
import {
  FormWrapper,
  FormForm,
  FormBlockLabel,
  FormTextInput,
  FormTextarea,
  FormSelect,
  FormButton,
  FormSuccessMessage,
  FormErrorMessage,
  Block,
} from '@upbuilder/react-framework';

<FormWrapper className="contact-form_wrapper">
  <FormForm name="contact-form" className="contact-form">
    {/* Text input field */}
    <Block className="form-field">
      <FormBlockLabel htmlFor="name" className="form-label">Name</FormBlockLabel>
      <FormTextInput
        name="name"
        placeholder="Enter your name"
        required
        className="form-input"
      />
    </Block>

    {/* Email input field */}
    <Block className="form-field">
      <FormBlockLabel htmlFor="email" className="form-label">Email</FormBlockLabel>
      <FormTextInput
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        className="form-input"
      />
    </Block>

    {/* Select dropdown */}
    <Block className="form-field">
      <FormBlockLabel htmlFor="subject" className="form-label">Subject</FormBlockLabel>
      <FormSelect name="subject" className="form-select">
        <option value="">Select a subject</option>
        <option value="general">General Inquiry</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
      </FormSelect>
    </Block>

    {/* Textarea */}
    <Block className="form-field">
      <FormBlockLabel htmlFor="message" className="form-label">Message</FormBlockLabel>
      <FormTextarea
        name="message"
        placeholder="Enter your message"
        required
        className="form-textarea"
      />
    </Block>

    {/* Submit button */}
    <FormButton text="Send Message" className="button is-primary form-submit" />
  </FormForm>

  {/* Success/Error messages */}
  <FormSuccessMessage className="form-success">
    Thank you! Your message has been sent.
  </FormSuccessMessage>
  <FormErrorMessage className="form-error">
    Oops! Something went wrong. Please try again.
  </FormErrorMessage>
</FormWrapper>
```

### Checkbox & Radio Examples

```tsx
import {
  FormWrapper,
  FormForm,
  FormCheckboxWrapper,
  FormCheckboxInput,
  FormRadioWrapper,
  FormRadioInput,
  Span,
  Block,
} from '@upbuilder/react-framework';

// Checkbox
<FormCheckboxWrapper className="checkbox-field">
  <FormCheckboxInput name="agree" required />
  <Span className="checkbox-label">I agree to the terms and conditions</Span>
</FormCheckboxWrapper>

// Radio buttons
<Block className="radio-group">
  <FormRadioWrapper className="radio-field">
    <FormRadioInput name="plan" value="basic" />
    <Span className="radio-label">Basic Plan</Span>
  </FormRadioWrapper>
  <FormRadioWrapper className="radio-field">
    <FormRadioInput name="plan" value="pro" />
    <Span className="radio-label">Pro Plan</Span>
  </FormRadioWrapper>
  <FormRadioWrapper className="radio-field">
    <FormRadioInput name="plan" value="enterprise" />
    <Span className="radio-label">Enterprise Plan</Span>
  </FormRadioWrapper>
</Block>
```

### Newsletter Form (Simple)

```tsx
import {
  FormWrapper,
  FormForm,
  FormTextInput,
  FormButton,
  FormSuccessMessage,
  FormErrorMessage,
  Block,
} from '@upbuilder/react-framework';

<FormWrapper className="newsletter-form_wrapper">
  <FormForm name="newsletter" className="newsletter-form">
    <Block className="newsletter-input-group">
      <FormTextInput
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        className="newsletter-input"
      />
      <FormButton text="Subscribe" className="button is-primary newsletter-button" />
    </Block>
  </FormForm>
  <FormSuccessMessage className="newsletter-success">
    You're subscribed!
  </FormSuccessMessage>
  <FormErrorMessage className="newsletter-error">
    Please try again.
  </FormErrorMessage>
</FormWrapper>
```

---

## Media Components

### Image (replaces `<img>`)

```tsx
import { Image } from '@upbuilder/react-framework';

<Image
  src="https://example.com/image.jpg"
  alt="Description of image"
  className="hero-image"
/>
```

### Video (YouTube/Vimeo embeds)

```tsx
import { Video } from '@upbuilder/react-framework';

// YouTube embed
<Video
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  videoTitle="Video Title"
  className="video-embed"
/>

// Vimeo embed
<Video
  videoUrl="https://vimeo.com/123456789"
  videoTitle="Vimeo Video"
  className="video-embed"
/>
```

### Background Video

```tsx
import {
  BackgroundVideoWrapper,
  Block,
  Heading,
} from '@upbuilder/react-framework';

<BackgroundVideoWrapper
  videoUrl="/videos/hero-bg.mp4"
  className="hero-section"
  settings={{ autoplay: true, loop: true, muted: true }}
>
  <Block className="hero-content">
    <Heading as="h1">Welcome</Heading>
  </Block>
</BackgroundVideoWrapper>
```

### HtmlEmbed (for custom HTML/SVG)

```tsx
import { HtmlEmbed } from '@upbuilder/react-framework';

// Custom SVG icon
<HtmlEmbed
  className="custom-icon"
  html={`<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>`}
/>

// Third-party widget
<HtmlEmbed
  className="twitter-embed"
  html={`<!-- Twitter embed code here -->`}
/>
```

---

## CMS Components

### CMS Collection List

```tsx
import {
  DynamoWrapper,
  DynamoList,
  DynamoItem,
  DynamoEmpty,
  Block,
  Image,
  Heading,
  Paragraph,
  Link,
} from '@upbuilder/react-framework';

<DynamoWrapper className="blog-collection">
  <DynamoList className="blog-list">
    <DynamoItem className="blog-card">
      <Image src="post1.jpg" alt="Post" className="blog-image" />
      <Block className="blog-content">
        <Heading as="h3" className="blog-title">Blog Post Title</Heading>
        <Paragraph className="blog-excerpt">Post excerpt text...</Paragraph>
        <Link href="/blog/post-1" className="blog-link">Read More</Link>
      </Block>
    </DynamoItem>
    {/* More DynamoItems... */}
  </DynamoList>
  <DynamoEmpty text="No posts found." className="empty-state" />
</DynamoWrapper>
```

### Search Components

```tsx
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchResults,
} from '@upbuilder/react-framework';

<SearchForm className="search-form">
  <SearchInput name="query" placeholder="Search..." className="search-input" />
  <SearchButton text="Search" className="search-button" />
</SearchForm>
```

### Lightbox

```tsx
import { LightboxWrapper, Image } from '@upbuilder/react-framework';

<LightboxWrapper className="gallery-lightbox">
  <Image src="photo.jpg" alt="Gallery photo" className="gallery-image" />
</LightboxWrapper>
```

### Map Widget

```tsx
import { MapWidget } from '@upbuilder/react-framework';

<MapWidget
  apiKey="YOUR_GOOGLE_MAPS_API_KEY"
  address="123 Main St, City, Country"
  className="contact-map"
/>
```

---

## Common Patterns

### Card Component

```tsx
import { Block, Image, Heading, Paragraph, Link } from '@upbuilder/react-framework';

<Block className="card">
  <Image src="thumbnail.jpg" alt="Card image" className="card_image" />
  <Block className="card_content">
    <Heading as="h3" className="card_title">Card Title</Heading>
    <Paragraph className="card_description">
      Card description text goes here.
    </Paragraph>
    <Link href="/learn-more" className="button is-secondary card_button">
      Learn More
    </Link>
  </Block>
</Block>
```

### Hero Section

```tsx
import { Section, Block, Heading, Paragraph, Link } from '@upbuilder/react-framework';

<Section className="section_hero">
  <Block className="padding-global padding-section-large">
    <Block className="container-large hero_container">
      <Block className="hero_content">
        <Heading as="h1" className="heading-style-h1 hero_title">
          Build Faster Websites
        </Heading>
        <Paragraph className="text-size-large hero_description">
          Create stunning websites without code using our visual builder.
        </Paragraph>
        <Block className="hero_buttons">
          <Link href="/signup" className="button is-primary">Get Started</Link>
          <Link href="/demo" className="button is-secondary">Watch Demo</Link>
        </Block>
      </Block>
      <Block className="hero_image-wrapper">
        <Image src="hero-image.jpg" alt="Hero" className="hero_image" />
      </Block>
    </Block>
  </Block>
</Section>
```

### Footer Section

```tsx
import {
  Section, Block, Heading, Paragraph, Link, Image, List, ListItem
} from '@upbuilder/react-framework';

<Section className="section_footer">
  <Block className="padding-global padding-section-medium">
    <Block className="container-large">
      <Block className="footer_top">
        <Block className="footer_brand">
          <Image src="logo.svg" alt="Logo" className="footer_logo" />
          <Paragraph className="footer_tagline">
            Building the future of web design.
          </Paragraph>
        </Block>
        <Block className="footer_links">
          <Block className="footer_column">
            <Heading as="h4" className="footer_heading">Product</Heading>
            <List className="footer_list">
              <ListItem><Link href="/features">Features</Link></ListItem>
              <ListItem><Link href="/pricing">Pricing</Link></ListItem>
              <ListItem><Link href="/templates">Templates</Link></ListItem>
            </List>
          </Block>
          <Block className="footer_column">
            <Heading as="h4" className="footer_heading">Company</Heading>
            <List className="footer_list">
              <ListItem><Link href="/about">About</Link></ListItem>
              <ListItem><Link href="/careers">Careers</Link></ListItem>
              <ListItem><Link href="/contact">Contact</Link></ListItem>
            </List>
          </Block>
        </Block>
      </Block>
      <Block className="footer_bottom">
        <Paragraph className="footer_copyright">
          © 2024 Company Name. All rights reserved.
        </Paragraph>
      </Block>
    </Block>
  </Block>
</Section>
```

---

## WRONG vs RIGHT Examples

### DON'T use raw HTML - use framework components

```tsx
// ❌ WRONG - Raw HTML elements
<div className="card">
  <h2>Title</h2>
  <p>Description</p>
  <a href="/link">Learn More</a>
  <input type="text" placeholder="Enter email" />
  <button>Submit</button>
</div>

// ✅ CORRECT - Framework components
<Block className="card">
  <Heading as="h2">Title</Heading>
  <Paragraph>Description</Paragraph>
  <Link href="/link">Learn More</Link>
  <FormWrapper>
    <FormForm name="email-form">
      <FormTextInput type="text" placeholder="Enter email" />
      <FormButton>Submit</FormButton>
    </FormForm>
  </FormWrapper>
</Block>
```

### DON'T use local state/variables

```tsx
// ❌ WRONG - Using state and variables
export function Features() {
  const [isOpen, setIsOpen] = useState(false);
  const features = ['Fast', 'Reliable', 'Secure'];

  return (
    <div>
      {features.map(f => <div key={f}>{f}</div>)}
    </div>
  );
}

// ✅ CORRECT - Static content only
export function Features() {
  return (
    <Section className="section_features">
      <Block className="features_list">
        <Block className="feature_item">Fast</Block>
        <Block className="feature_item">Reliable</Block>
        <Block className="feature_item">Secure</Block>
      </Block>
    </Section>
  );
}
```

---

## Quick Import Reference

```tsx
// Layout & Structure
import { Block, Section, BlockContainer, Grid, Row, Column, HFlex, VFlex } from '@upbuilder/react-framework';

// Typography
import { Heading, Paragraph, Span, Blockquote, RichText, Figure, Figcaption } from '@upbuilder/react-framework';
import { Strong, Emphasized, Superscript, Subscript, InlineCode, Strikethrough, Underline } from '@upbuilder/react-framework';
import { LineBreak, CodeBlock } from '@upbuilder/react-framework';

// Links & Buttons
import { Link, LinkBlock, TextLink, Button } from '@upbuilder/react-framework';

// Lists
import { List, ListItem } from '@upbuilder/react-framework';

// Media
import { Image, Video, BackgroundVideoWrapper, HtmlEmbed } from '@upbuilder/react-framework';

// Navigation
import { NavbarWrapper, NavbarBrand, NavbarMenu, NavbarLink, NavbarButton, HamburgerIcon } from '@upbuilder/react-framework';

// Dropdown/Accordion
import { DropdownWrapper, DropdownToggle, DropdownList, DropdownLink } from '@upbuilder/react-framework';

// Tabs
import { TabsWrapper, TabsMenu, TabsLink, TabsContent, TabsPane } from '@upbuilder/react-framework';

// Swiper Slider (uses Swiper library - no CSS restrictions!)
import { SwiperSlider, SwiperSlide, SwiperNavPrev, SwiperNavNext, SwiperPagination, SwiperScrollbar } from '@upbuilder/react-framework';

// Forms
import { FormWrapper, FormForm, FormBlockLabel, FormInlineLabel } from '@upbuilder/react-framework';
import { FormTextInput, FormTextarea, FormSelect, FormButton } from '@upbuilder/react-framework';
import { FormCheckboxWrapper, FormCheckboxInput, FormRadioWrapper, FormRadioInput } from '@upbuilder/react-framework';
import { FormSuccessMessage, FormErrorMessage } from '@upbuilder/react-framework';

// CMS
import { DynamoWrapper, DynamoList, DynamoItem, DynamoEmpty } from '@upbuilder/react-framework';
import { SearchForm, SearchInput, SearchButton, SearchResults, LightboxWrapper, MapWidget } from '@upbuilder/react-framework';
```
