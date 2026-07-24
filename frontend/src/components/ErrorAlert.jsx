import { AlertCircle } from "lucide-react";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert">
      <div className="error-alert-content">
        <AlertCircle className="error-icon" size={36} />
        <p className="error-alert-message">{message}</p>
        {onRetry && (
          <button className="btn-error" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}