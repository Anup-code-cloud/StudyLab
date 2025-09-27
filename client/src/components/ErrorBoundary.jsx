import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log to an error reporting service here
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReload = () => {
    if (this.props.onReset) this.props.onReset();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-lg w-full rounded-2xl shadow p-6 text-center">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="mb-4">{this.state.error?.message || "An unexpected error occurred."}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={this.handleReload} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Reload</button>
              <button onClick={() => this.setState({ hasError: false, error: null })} className="px-4 py-2 rounded-xl border">Try Again</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
