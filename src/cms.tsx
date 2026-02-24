/**
 * CMS/Dynamic components - local implementations
 */
import React from 'react';

export interface DynamoWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

export function DynamoWrapper({ className, children }: DynamoWrapperProps) {
  return <div className={className}>{children}</div>;
}

export function DynamoList({ className, children }: DynamoWrapperProps) {
  return <div className={`${className || ''} w-dyn-items`}>{children}</div>;
}

export function DynamoItem({ className, children }: DynamoWrapperProps) {
  return <div className={`${className || ''} w-dyn-item`}>{children}</div>;
}

export interface DynamoEmptyProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DynamoEmpty({ text, className, children }: DynamoEmptyProps) {
  return <div className={`${className || ''} w-dyn-empty`}>{children || text || 'No items found.'}</div>;
}

export interface SearchFormProps {
  className?: string;
  children?: React.ReactNode;
}

export function SearchForm({ className, children }: SearchFormProps) {
  return <form className={className} role="search">{children}</form>;
}

export interface SearchInputProps {
  name?: string;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ name = 'query', placeholder = 'Search...', className }: SearchInputProps) {
  return <input type="search" name={name} placeholder={placeholder} className={className} />;
}

export interface SearchButtonProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SearchButton({ text = 'Search', className, children }: SearchButtonProps) {
  return <button type="submit" className={className}>{children || text}</button>;
}

export function SearchResults({ className, children }: DynamoWrapperProps) {
  return <div className={className}>{children}</div>;
}

export interface LightboxWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

export function LightboxWrapper({ className, children }: LightboxWrapperProps) {
  return <div className={`${className || ''} w-lightbox`}>{children}</div>;
}

export interface MapWidgetProps {
  apiKey?: string;
  address?: string;
  className?: string;
}

export function MapWidget({ apiKey, address, className }: MapWidgetProps) {
  if (!apiKey || !address) return <div className={className}>Map placeholder</div>;

  const encodedAddress = encodeURIComponent(address);
  return (
    <iframe
      className={className}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`}
      style={{ border: 0, width: '100%', height: '100%' }}
      allowFullScreen
      loading="lazy"
    />
  );
}
