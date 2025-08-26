import { Component, ReactNode, ErrorInfo } from 'react';
import { MLHeading, MLText } from './ML';
import { Button } from './UI';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Unified error display component
const ErrorDisplay = ({ error, onRetry }: { error?: Error; onRetry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center px-6">
    <div className="max-w-md mx-auto text-center">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <MLHeading level={2} className="mb-4">
        Something went wrong
      </MLHeading>
      
      <MLText variant="body" color="weak" className="mb-8">
        We're sorry, but something unexpected happened. Please try again or contact us if the problem persists.
      </MLText>

      {import.meta.env.DEV && error && (
        <details className="text-left mb-8 p-4 bg-surface-1 rounded-lg">
          <summary className="cursor-pointer text-sm font-medium text-text-weak mb-2">
            Error Details (Development)
          </summary>
          <pre className="text-xs text-error overflow-auto">
            {error.message}
            {'\n'}
            {error.stack}
          </pre>
        </details>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="filled" onClick={onRetry}>
          Try Again
        </Button>
        <Button variant="outlined" onClick={() => window.location.href = '/'}>
          Go Home
        </Button>
      </div>
    </div>
  </div>
);

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you might want to log this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorDisplay error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}