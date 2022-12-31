import { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorBoundary.css";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Logging", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>Something went wrong, try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
