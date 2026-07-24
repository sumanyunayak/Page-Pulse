import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function Hero({ onSubmit, loading }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) onSubmit(url.trim());
  };

  return (
    <div className="hero-wrapper">
      <div className="hero-blob hero-blob--purple" />
      <div className="hero-blob hero-blob--blue" />
      <div className="hero-card">
        <h1 className="hero-title">Page Pulse</h1>
        <p className="hero-subtitle">Audit any webpage in seconds</p>
        <form className="hero-form" onSubmit={handleSubmit}>
          <input
            type="url"
            className="hero-input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="hero-btn"
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <>
                <LoaderCircle className="btn-spinner" size={18} />
                Analyzing Website...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}