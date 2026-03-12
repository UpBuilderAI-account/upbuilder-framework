/**
 * CMS/Dynamic components - local implementations
 */
import React from 'react';

export interface DynamoWrapperProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function DynamoWrapper({ className, children, ...rest }: DynamoWrapperProps) {
  return <div {...rest} className={className}>{children}</div>;
}

export function DynamoList({ className, children, ...rest }: DynamoWrapperProps) {
  return <div {...rest} className={`${className || ''} w-dyn-items`}>{children}</div>;
}

export function DynamoItem({ className, children, ...rest }: DynamoWrapperProps) {
  return <div {...rest} className={`${className || ''} w-dyn-item`}>{children}</div>;
}

export interface DynamoEmptyProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function DynamoEmpty({ text, className, children, ...rest }: DynamoEmptyProps) {
  return <div {...rest} className={`${className || ''} w-dyn-empty`}>{children || text || 'No items found.'}</div>;
}

export interface SearchFormProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function SearchForm({ className, children, ...rest }: SearchFormProps) {
  return <form {...rest} className={className} role="search">{children}</form>;
}

export interface SearchInputProps {
  name?: string;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

export function SearchInput({ name = 'query', placeholder = 'Search...', className, ...rest }: SearchInputProps) {
  return <input {...rest} type="search" name={name} placeholder={placeholder} className={className} />;
}

export interface SearchButtonProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function SearchButton({ text = 'Search', className, children, ...rest }: SearchButtonProps) {
  return <button {...rest} type="submit" className={className}>{children || text}</button>;
}

export function SearchResults({ className, children, ...rest }: DynamoWrapperProps) {
  return <div {...rest} className={className}>{children}</div>;
}

export interface LightboxItem {
  url: string;
  type?: 'image' | 'video';
  caption?: string;
  thumbnail?: string;
}

export interface LightboxWrapperProps {
  className?: string;
  children?: React.ReactNode;
  /** Lightbox group name - items with same group can be navigated together */
  group?: string;
  /** Media items to show in lightbox (images/videos) */
  items?: LightboxItem[];
  /** Exclude from site search */
  searchExclude?: boolean;
  [key: string]: any;
}

export function LightboxWrapper({ className, children, group, items, searchExclude, ...rest }: LightboxWrapperProps) {
  // In React preview, just render as clickable - lightbox behavior handled by Webflow
  return (
    <a
      {...rest}
      href="#"
      className={`${className || ''} w-lightbox`}
      data-lightbox-group={group}
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

export interface LightboxLinkProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  [key: string]: any;
}

export function LightboxLink({ className, children, href = '#', ...rest }: LightboxLinkProps) {
  return (
    <a {...rest} href={href} className={`${className || ''} w-lightbox-link`}>
      {children}
    </a>
  );
}

export interface MapWidgetProps {
  apiKey?: string;
  address?: string;
  className?: string;
  [key: string]: any;
}

export function MapWidget({ apiKey, address, className, ...rest }: MapWidgetProps) {
  if (!apiKey || !address) return <div {...rest} className={className}>Map placeholder</div>;

  const encodedAddress = encodeURIComponent(address);
  return (
    <iframe
      {...rest}
      className={className}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`}
      style={{ border: 0, width: '100%', height: '100%' }}
      allowFullScreen
      loading="lazy"
    />
  );
}
