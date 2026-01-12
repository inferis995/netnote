import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null; errorInfo: React.ErrorInfo | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red", height: "100vh", overflow: "auto", background: "white" }}>
          <h1>Qualcosa è andato storto (Errore Critico)</h1>
          <p>L'applicazione ha riscontrato un errore imprevisto all'avvio.</p>
          <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "4px", margin: "10px 0", color: "#333", fontFamily: "monospace" }}>
            <strong>{this.state.error?.toString()}</strong>
          </div>
          <details style={{ whiteSpace: "pre-wrap", fontSize: "12px", color: "#666" }}>
            <summary>Stack Trace</summary>
            {this.state.errorInfo?.componentStack}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "20px", padding: "8px 16px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Ricarica Applicazione
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
