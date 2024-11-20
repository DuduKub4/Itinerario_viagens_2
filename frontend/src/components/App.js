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
      <nav>
        <Link to="/">Home</Link> | <Link to="/plan">Planejador</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/plan"
          element={
            <div>
              <h1>Planejador de Viagens</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Destino"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Dias"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Preferências"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                />
                <button type="submit">Gerar Itinerário</button>
              </form>
              {result && (
                <div>
                  <h2>Itinerário</h2>
                  <pre>{result.itinerary}</pre>
                  <h2>Previsão do Tempo</h2>
                  <pre>{JSON.stringify(result.weather, null, 2)}</pre>
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
