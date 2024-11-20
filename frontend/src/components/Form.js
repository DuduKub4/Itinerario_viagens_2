import React, { useState } from "react";
import "./Form.css";

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

          {result && <ItineraryResult result={result} destination={destination} days={days} />}
        </div>
      </div>
    </div>
  );
}

// Componente ItineraryResult dentro do mesmo arquivo
const ItineraryResult = ({ result, destination, days }) => (
  <div className="card shadow-sm">
    <div className="card-body">
      <h2 className="card-title text-center mb-4">Seu Itinerário para {destination}</h2>

      <div className="mb-4">
        <h3 className="h5 mb-3">Roteiro Sugerido:</h3>
        <div className="itinerary-content">
          {result?.itinerary ? (
            result.itinerary.split("\n").filter(Boolean).map((line, index) => (
              <p key={index}>{line}</p>
            ))
          ) : (
            <p>Nenhum itinerário disponível.</p>
          )}
        </div>
      </div>

      {result.weather && result.weather.list && (
        <div className="weather-section">
          <h3 className="h5 mb-3">Previsão do Tempo:</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {result.weather.list.slice(0, days).map((day, index) => (
              <div key={index} className="col">
                <div className="card h-100 weather-card">
                  <div className="card-body">
                    <h5 className="card-title">{new Date(day.dt * 1000).toLocaleDateString("pt-BR")}</h5>
                    <p className="card-text">
                      <i className="bi bi-thermometer-half me-2"></i>
                      {Math.round(day.main.temp)}°C
                    </p>
                    <p className="card-text">
                      <i className="bi bi-cloud me-2"></i>
                      {day.weather[0].description}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-droplet me-2"></i>
                      {day.main.humidity}% de umidade
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Form;
