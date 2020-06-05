import React, { ReactNode, ErrorInfo } from 'react';

import Button from '../Button';

export default class ErrorBoundary extends React.Component<{}, { error: Error | null }> {
  constructor(props: {}) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // log the error to the server
    console.log(error, info);
  }

  tryAgain = (): void => this.setState({ error: null });

  render(): ReactNode {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <div>
          There was an error.
          <Button onClick={this.tryAgain}>Try again</Button>

          <pre style={{ whiteSpace: 'normal' }}>{error?.message}</pre>
        </div>
      );
    }

    return children;
  }
}
