import google.generativeai as genai
import requests
from dotenv import load_dotenv
import os
from app.models.itinerary import ItineraryRequest

# Carregar variáveis de ambiente
load_dotenv(dotenv_path="/itinerario_viagens_2/.env")

# Configurações de APIs
API_KEY = os.getenv("API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

# Validação de chaves API
def validate_api_keys():
    if not API_KEY:
        raise ValueError("API Key do Gemini não encontrada. Verifique o arquivo .env")
    if not WEATHER_API_KEY:
        raise ValueError("API Key da Weather API não encontrada. Verifique o arquivo .env")

validate_api_keys()

# Configurar a API Gemini
genai.configure(api_key=API_KEY)

async def generate_itinerary_service(request: ItineraryRequest):
    """
    Serviço principal para gerar o itinerário e obter a previsão do tempo.
    """
    itinerary = generate_itinerary(request)
    weather = get_weather_forecast(request)

    # Retornar os dados diretamente sem formatação adicional
    return {
        "itinerario": {
            "destino": request.destination,
            "dias": request.days,
            "preferencias": request.preferences,
            "roteiro": itinerary,
        },
        "previsao_tempo": weather,
    }

def generate_itinerary(request: ItineraryRequest) -> dict:
    """
    Gera o itinerário usando a API Gemini e retorna em formato bruto.
    """
    prompt = (
        f"Crie um itinerário de {request.days} dias para {request.destination} com foco em {request.preferences}. "
        "Organize por dia, horários e inclua atividades detalhadas."
    )

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return {"conteudo": response.text}
    except Exception as e:
        raise Exception(f"Erro ao gerar itinerário: {str(e)}")

def get_weather_forecast(request: ItineraryRequest) -> dict:
    """
    Obtém a previsão do tempo para o destino e retorna os dados brutos em JSON.
    """
    try:
        response = requests.get(
            WEATHER_API_URL,
            params={
                "q": request.destination,
                "cnt": request.days * 8,  # Previsão a cada 3 horas
                "appid": WEATHER_API_KEY,
                "units": "metric",
                "lang": "pt_br",
            },
        )
        response.raise_for_status()
        return response.json()  # Retorna os dados brutos da API
    except Exception as e:
        raise Exception(f"Erro ao obter dados climáticos: {str(e)}")
