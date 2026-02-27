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

export interface LightboxWrapperProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function LightboxWrapper({ className, children, ...rest }: LightboxWrapperProps) {
  return <div {...rest} className={`${className || ''} w-lightbox`}>{children}</div>;
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
