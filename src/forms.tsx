/**
 * Form components - local implementations
 */
import React from 'react';
import type {
  FormProps,
  FormInputProps,
  FormTextareaProps as FormTextareaPropsBase,
  FormSelectProps as FormSelectPropsBase,
  FormCheckboxProps,
  FormRadioProps,
  FormLabelProps as FormLabelPropsBase,
} from '../component-props';

export interface FormWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

export function FormWrapper({ className, children }: FormWrapperProps) {
  return <div className={`${className || ''} w-form`}>{children}</div>;
}

export interface FormFormProps extends FormProps {
  action?: string;
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export function FormForm({ name, action, method = 'post', className, children, onSubmit }: FormFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form name={name} action={action} method={method} className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export interface FormLabelProps extends FormLabelPropsBase {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export function FormBlockLabel({ text, htmlFor, className, children }: FormLabelProps) {
  return <label htmlFor={htmlFor} className={className}>{children || text}</label>;
}

export function FormInlineLabel({ text, htmlFor, className, children }: FormLabelProps) {
  return <label htmlFor={htmlFor} className={className} style={{ display: 'inline' }}>{children || text}</label>;
}

export interface FormTextInputComponentProps extends FormInputProps {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormTextInput({ name, type = 'text', placeholder, required, value, className, onChange }: FormTextInputComponentProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={value}
      className={`${className || ''} w-input`}
      onChange={onChange}
    />
  );
}

export interface FormTextareaComponentProps extends FormTextareaPropsBase {
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({ name, placeholder, required, value, className, onChange }: FormTextareaComponentProps) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={value}
      className={`${className || ''} w-input`}
      onChange={onChange}
    />
  );
}

export interface FormSelectComponentProps extends FormSelectPropsBase {
  className?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function FormSelect({ name, required, className, children, onChange }: FormSelectComponentProps) {
  return (
    <select name={name} required={required} className={`${className || ''} w-select`} onChange={onChange}>
      {children}
    </select>
  );
}

export interface FormButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: React.ReactNode;
}

export function FormButton({ text, type = 'submit', className, children }: FormButtonProps) {
  return (
    <button type={type} className={`${className || ''} w-button`}>
      {children || text}
    </button>
  );
}

export function FormCheckboxWrapper({ className, children }: FormWrapperProps) {
  return <label className={`${className || ''} w-checkbox`}>{children}</label>;
}

export interface FormCheckboxInputProps {
  name?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormCheckboxInput({ name, required, className, onChange }: FormCheckboxInputProps) {
  return <input type="checkbox" name={name} required={required} className={className} onChange={onChange} />;
}

export function FormRadioWrapper({ className, children }: FormWrapperProps) {
  return <label className={`${className || ''} w-radio`}>{children}</label>;
}

export interface FormRadioInputProps {
  name?: string;
  value?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormRadioInput({ name, value, required, className, onChange }: FormRadioInputProps) {
  return <input type="radio" name={name} value={value} required={required} className={className} onChange={onChange} />;
}

export interface FormMessageProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export function FormSuccessMessage({ text, className, children }: FormMessageProps) {
  return <div className={`${className || ''} w-form-done`}>{children || text || 'Thank you! Your submission has been received!'}</div>;
}

export function FormErrorMessage({ text, className, children }: FormMessageProps) {
  return <div className={`${className || ''} w-form-fail`}>{children || text || 'Oops! Something went wrong.'}</div>;
}

// File upload components (simplified)
export function FormFileUploadWrapper({ className, children }: FormWrapperProps) {
  return <div className={className}>{children}</div>;
}

export function FormFileUploadDefault({ className, children }: FormWrapperProps) {
  return <div className={className}>{children}</div>;
}

export function FormFileUploadUploading({ className, children }: FormWrapperProps) {
  return <div className={className}>{children}</div>;
}

export function FormFileUploadSuccess({ className, children }: FormWrapperProps) {
  return <div className={className}>{children}</div>;
}

export function FormFileUploadError({ className, children }: FormWrapperProps) {
  return <div className={className}>{children}</div>;
}

export interface FormFileUploadInputProps {
  name?: string;
  accept?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormFileUploadInput({ name, accept, className, onChange }: FormFileUploadInputProps) {
  return <input type="file" name={name} accept={accept} className={className} onChange={onChange} />;
}

export function FormFileUploadLabel({ text, className, children }: FormMessageProps) {
  return <div className={className}>{children || text}</div>;
}

export function FormFileUploadErrorMsg({ text, className, children }: FormMessageProps) {
  return <div className={className}>{children || text}</div>;
}

export interface FormReCaptchaProps {
  siteKey?: string;
  className?: string;
}

export function FormReCaptcha({ siteKey, className }: FormReCaptchaProps) {
  return <div className={className} data-sitekey={siteKey} />;
}
