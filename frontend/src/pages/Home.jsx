import { useState } from "react";
import { analyzeUrl } from "../services/api";
import Hero from "../components/Hero";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import ResultsGrid from "../components/ResultsGrid";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [revealing, setRevealing] = useState(false);

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError(null);
    setData(null);
    setRevealing(false);
    try {
      const result = await analyzeUrl(url);
      setData(result);
      setRevealing(true);
      setTimeout(() => setLoading(false), 400);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(msg);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
    setRevealing(false);
  };

  return (
    <main className="home">
      <Hero onSubmit={handleAnalyze} loading={loading || revealing} />

      {!data && !loading && !error && !revealing && <EmptyState />}

      {loading && <Loader revealing={revealing} />}

      {error && <ErrorAlert message={error} onRetry={handleReset} />}

      {data && <ResultsGrid data={data} onReset={handleReset} />}
    </main>
  );
}