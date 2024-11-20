import React, { useState } from "react";

function Form() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [preferences, setPreferences] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, preferences }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar o itinerário");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Planejador de Viagens</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
            Destino
          </label>
          <input
            type="text"
            id="destination"
            className="form-control"
            placeholder="Exemplo: Paris"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="days" className="form-label">
            Dias
          </label>
          <input
            type="number"
            id="days"
            className="form-control"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preferences" className="form-label">
            Preferências
          </label>
          <input
            type="text"
            id="preferences"
            className="form-control"
            placeholder="Exemplo: Museus, pontos turísticos"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Gerar Itinerário
        </button>
      </form>
      {result && (
        <div className="mt-5">
          <h2 className="text-center">Resultado</h2>
          <div className="card p-3 shadow">
            <h4>Itinerário</h4>
            <pre>{result.itinerary}</pre>
            <h4>Previsão do Tempo</h4>
            <pre>{JSON.stringify(result.weather, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
