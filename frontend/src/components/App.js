import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";

function App() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [preferences, setPreferences] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/generate-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, days, preferences }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <Router>
      {/* Cabeçalho com navegação */}
      <header className="bg-primary text-white py-3">
        <div className="container d-flex justify-content-between">
          <h1 className="h3">Planejador de Viagens</h1>
          <nav>
            <Link to="/" className="text-white text-decoration-none mx-3">
              Home
            </Link>
            <Link to="/plan" className="text-white text-decoration-none mx-3">
              Planejador
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/plan"
            element={
              <div className="card p-4 shadow">
                <h1 className="text-center mb-4">Planejador de Viagens</h1>
                <form onSubmit={handleSubmit}>
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
                      placeholder="Número de dias"
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
                      placeholder="Exemplo: Museus, praias"
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
            }
          />
        </Routes>
      </main>

      {/* Rodapé */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Planejador de Viagens. Todos os direitos reservados.</p>
      </footer>
    </Router>
  );
}

export default App;
