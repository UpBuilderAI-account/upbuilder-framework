/**
 * Error Boundary component for catching and displaying React errors
 * Wrap your components/pages with this to show errors visually instead of crashing
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI to show when error occurs */
  fallback?: ReactNode;
  /** Called when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Show detailed error info (stack trace) - default true in development */
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback takes priority
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;
      const showDetails = this.props.showDetails ?? process.env.NODE_ENV === 'development';

      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.header}>
              <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2 style={styles.title}>Something went wrong</h2>
            </div>

            <p style={styles.message}>
              {error?.message || 'An unexpected error occurred'}
            </p>

            {showDetails && errorInfo && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details</summary>
                <pre style={styles.stack}>
                  {error?.stack}
                  {'\n\nComponent Stack:'}
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={styles.actions}>
              <button onClick={this.handleReset} style={styles.button}>
                Try Again
              </button>
              <button onClick={() => window.location.reload()} style={styles.buttonSecondary}>
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#18181b',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#27272a',
    borderRadius: '12px',
    padding: '32px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  icon: {
    width: '28px',
    height: '28px',
    color: '#ef4444',
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#fafafa',
  },
  message: {
    margin: '0 0 20px 0',
    fontSize: '15px',
    color: '#a1a1aa',
    lineHeight: 1.5,
  },
  details: {
    marginBottom: '20px',
    backgroundColor: '#1f1f23',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  summary: {
    padding: '12px 16px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#d4d4d8',
    cursor: 'pointer',
    userSelect: 'none',
  },
  stack: {
    margin: 0,
    padding: '16px',
    paddingTop: 0,
    fontSize: '12px',
    color: '#ef4444',
    overflow: 'auto',
    maxHeight: '300px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    lineHeight: 1.5,
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#fafafa',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonSecondary: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#d4d4d8',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
  },
};

export default ErrorBoundary;
