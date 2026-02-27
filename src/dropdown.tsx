/**
 * Dropdown components - local implementations
 */
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Dropdown configuration props
export interface DropdownProps {
  open?: boolean;
  hover?: boolean;
  delay?: number;
}

// ============================================================================
// DROPDOWN CONTEXT
// ============================================================================

interface DropdownContextValue {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  isAccordion: boolean;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within DropdownWrapper');
  return ctx;
}

// ============================================================================
// DROPDOWN
// ============================================================================

export interface DropdownWrapperProps extends DropdownProps {
  className?: string;
  children?: React.ReactNode;
  /** Accordion mode - always uses click trigger */
  accordion?: boolean;
  /** Start in open state */
  startOpen?: boolean;
  [key: string]: any;
}

export function DropdownWrapper({
  className,
  children,
  accordion = false,
  hover = false,
  delay = 200,
  startOpen = false,
  ...rest
}: DropdownWrapperProps) {
  // Accordion always uses click mode
  const isHover = !accordion && hover;

  const [isOpen, setIsOpen] = useState(startOpen);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };
  const close = () => {
    if (isHover && delay > 0) {
      closeTimeoutRef.current = setTimeout(() => setIsOpen(false), delay);
    } else {
      setIsOpen(false);
    }
  };

  // Close on click outside (for click mode / accordion)
  useEffect(() => {
    if (!isOpen || isHover) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, isHover]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, open, close, isAccordion: accordion }}>
      <div
        {...rest}
        ref={wrapperRef}
        className={`${className || ''} w-dropdown ${isOpen ? 'w--open' : ''}`}
        onMouseEnter={isHover ? open : undefined}
        onMouseLeave={isHover ? close : undefined}
        data-hover={isHover ? 'true' : 'false'}
        data-open={isOpen}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export interface DropdownToggleProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function DropdownToggle({ text, className, children, ...rest }: DropdownToggleProps) {
  const { toggle, isOpen, isAccordion } = useDropdownContext();

  return (
    <div
      {...rest}
      className={`${className || ''} w-dropdown-toggle`}
      onClick={isAccordion ? toggle : undefined}
      style={{ cursor: 'pointer' }}
      aria-expanded={isOpen}
      aria-haspopup="true"
      role="button"
    >
      {children || text}
    </div>
  );
}

export interface DropdownListProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function DropdownList({ className, children, ...rest }: DropdownListProps) {
  const { isOpen } = useDropdownContext();

  return (
    <nav
      {...rest}
      className={`${className || ''} w-dropdown-list ${isOpen ? 'w--open' : ''}`}
      role="menu"
    >
      {children}
    </nav>
  );
}

export interface DropdownLinkProps {
  text?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function DropdownLink({ text, href = '#', className, children, ...rest }: DropdownLinkProps) {
  const { close, isAccordion } = useDropdownContext();

  const handleClick = () => {
    if (!isAccordion) close();
  };

  return (
    <a
      {...rest}
      className={`${className || ''} w-dropdown-link`}
      href={href}
      onClick={handleClick}
      role="menuitem"
    >
      {children || text}
    </a>
  );
}

// ============================================================================
// ACCORDION (Click-based dropdown for FAQ sections)
// ============================================================================

export interface AccordionItemProps {
  className?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  [key: string]: any;
}

export function AccordionItem({ className, children, ...rest }: AccordionItemProps) {
  return <DropdownWrapper {...rest} className={className} accordion>{children}</DropdownWrapper>;
}

export function AccordionTrigger({ className, children, ...rest }: { className?: string; children?: React.ReactNode; [key: string]: any }) {
  return <DropdownToggle {...rest} className={className}>{children}</DropdownToggle>;
}

export function AccordionContent({ className, children, ...rest }: { className?: string; children?: React.ReactNode; [key: string]: any }) {
  return <DropdownList {...rest} className={className}>{children}</DropdownList>;
}
