/**
 * Dropdown components - local implementations
 */
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { DropdownProps } from '../component-props';

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
}

export function DropdownWrapper({
  className,
  children,
  accordion = false,
  hover = false,
  delay = 200,
  startOpen = false,
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
}

export function DropdownToggle({ text, className, children }: DropdownToggleProps) {
  const { toggle, isOpen, isAccordion } = useDropdownContext();

  return (
    <div
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

export function DropdownList({ className, children }: DropdownWrapperProps) {
  const { isOpen } = useDropdownContext();

  return (
    <nav
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
}

export function DropdownLink({ text, href = '#', className, children }: DropdownLinkProps) {
  const { close, isAccordion } = useDropdownContext();

  const handleClick = () => {
    if (!isAccordion) close();
  };

  return (
    <a
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
}

export function AccordionItem({ className, children }: AccordionItemProps) {
  return <DropdownWrapper className={className} accordion>{children}</DropdownWrapper>;
}

export function AccordionTrigger({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <DropdownToggle className={className}>{children}</DropdownToggle>;
}

export function AccordionContent({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <DropdownList className={className}>{children}</DropdownList>;
}
