import React from "react";
import "../assets/css/ItineraryResult.css";

const ItineraryResult = ({ result }) => {
  const itinerary = result?.itinerario;
  const weather = result?.previsao_tempo;

  // Extrair nome do local da atividade para pesquisa no Google Maps
  const extractLocation = (activity) => {
    // Tenta capturar o nome do local baseado em palavras-chave
    const regex = /(?:no|em|para|visite|veja|chegue|explore|ao)\s+(.*?)(?:\.|$)/i;
    const match = activity.match(regex);

    // Retorna a captura ou o texto completo se não for possível determinar
    return match ? match[1] : activity;
  };

  // Processar o roteiro em uma tabela
  const renderTableFromItinerary = (content) => {
    const rows = [];
    let currentDay = "";

    content.split("\n").forEach((line) => {
      line = line.trim(); // Remove espaços desnecessários

      if (line.startsWith("**Dia")) {
        // Detectar um novo dia
        currentDay = line.replace(/\*\*/g, "").trim(); // Remove todos os asteriscos do título do dia
      } else if (line.startsWith("*")) {
        // Detectar uma atividade
        const activity = line.replace(/\*\*/g, "").replace("*", "").trim(); // Remove todos os asteriscos e o "*" inicial
        if (currentDay && activity) {
          rows.push({ day: currentDay, activity });
        }
      }
    });

    if (rows.length === 0) {
      return <p>Nenhum dado de itinerário disponível.</p>;
    }

    // Renderiza a tabela com dias e atividades, adicionando links para o Google Maps
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Atividade</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.day}</td>
              <td>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    extractLocation(row.activity)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.activity}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">
          Planejamento para {itinerary?.destino || "Destino não informado"}
        </h2>

        <div className="mb-4">
          <h3 className="h5 mb-3">Roteiro Sugerido</h3>
          {itinerary?.roteiro?.conteudo ? (
            renderTableFromItinerary(itinerary.roteiro.conteudo)
          ) : (
            <p>Nenhum itinerário disponível.</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="h5 mb-3">Previsão do Tempo</h3>
          {weather?.list?.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-3 g-3">
              {weather.list.slice(0, itinerary?.dias || 1).map((day, index) => (
                <div key={index} className="col">
                  <div className="card weather-card">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        {new Date(day.dt * 1000).toLocaleDateString("pt-BR")}
                      </h5>
                      <p className="card-text">
                        <i className="bi bi-thermometer-half"></i>{" "}
                        {Math.round(day.main.temp)}°C
                      </p>
                      <p className="card-text">
                        <i className="bi bi-cloud"></i>{" "}
                        {day.weather[0].description}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-droplet"></i>{" "}
                        {day.main.humidity}% Umidade
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Sem dados de previsão do tempo disponíveis.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;
