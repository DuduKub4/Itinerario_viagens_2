import React, { useState } from "react";
import "../assets/css/Form.css";
import ItineraryResult from "./ItineraryResult";

function Form() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [preferences, setPreferences] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/generate-itinerary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          days: parseInt(days, 10),
          preferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || "Erro ao gerar itinerário");
      }

      const data = await response.json();
      console.log("Resposta do backend:", data); // Debug: Log da resposta bruta
      setResult(data);
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Planejador de Viagens</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card shadow-sm p-4 mb-5">
            <div className="mb-3">
              <label className="form-label">Destino</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                placeholder="Ex: Paris, França"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Dias</label>
              <input
                type="number"
                className="form-control"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                required
                min="1"
                max="30"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferências</label>
              <textarea
                className="form-control"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                required
                placeholder="Ex: museus, gastronomia, natureza..."
                rows="3"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Gerando...
                </>
              ) : (
                "Gerar Itinerário"
              )}
            </button>
          </form>

          {result && <ItineraryResult result={result} />}
        </div>
      </div>
    </div>
  );
}

export default Form;
