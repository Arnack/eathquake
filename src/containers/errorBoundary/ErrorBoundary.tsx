import React, {ErrorInfo, ReactNode} from 'react';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        errorInfo: undefined
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
        this.setState({ errorInfo })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <>
                <h1>Something went wrong</h1>
                <p>Please try to reload the page later or contact  your administrator</p>
            </>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
