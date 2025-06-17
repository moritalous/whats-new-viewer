'use client';

import { Component, ReactNode } from 'react';
import { Alert, Box } from '@cloudscape-design/components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box padding="l">
            <Alert type="error" header="Something went wrong">
              An unexpected error occurred. Please refresh the page and try
              again.
            </Alert>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
