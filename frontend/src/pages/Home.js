import React from "react";

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Bem-vindo ao Planejador de Viagens</h1>
      <p className="lead">
        Utilize inteligência artificial para criar itinerários personalizados e obter
        informações climáticas detalhadas.
      </p>
      <p>
        Comece informando seu destino, número de dias e preferências no formulário para gerar 
        seu itinerário ideal!
      </p>
      <a href="/plan" className="btn btn-primary mt-3">
        Começar Agora
      </a>
    </div>
  );
}

export default Home;
