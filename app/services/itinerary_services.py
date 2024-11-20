import google.generativeai as genai
import requests
from dotenv import load_dotenv
import os
from datetime import datetime
from app.models.itinerary import ItineraryRequest

# Carregar variáveis de ambiente
load_dotenv()

# Configurações de APIs
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

# Validação de chaves API
def validate_api_keys():
    if not GEMINI_API_KEY:
        raise ValueError("API Key do Gemini não encontrada. Verifique o arquivo .env")
    if not WEATHER_API_KEY:
        raise ValueError("API Key da Weather API não encontrada. Verifique o arquivo .env")

validate_api_keys()

# Configurar a API Gemini
genai.configure(api_key=GEMINI_API_KEY)

async def generate_itinerary_service(request: ItineraryRequest):
    """
    Serviço principal para gerar o itinerário e obter a previsão do tempo.
    """
    itinerary = generate_itinerary(request)
    weather = get_weather_forecast(request)

    # Retornar dados combinados
    return {
        "itinerario": {
            "destino": request.destination,
            "dias": request.days,
            "preferencias": request.preferences,
            "roteiro": itinerary,
        },
        "previsao_tempo": weather,
    }

def generate_itinerary(request: ItineraryRequest) -> str:
    """
    Gera o itinerário usando a API Gemini.
    """
    prompt = (
        f"Crie um itinerário de {request.days} dias para {request.destination} com foco em {request.preferences}. "
        "Organize por dia, horários e inclua atividades detalhadas."
    )

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Erro ao gerar itinerário: {str(e)}")

def get_weather_forecast(request: ItineraryRequest) -> list:
    """
    Obtém a previsão do tempo para o destino e formata os resultados.
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
        weather_data = response.json()
        return format_weather_data(weather_data, request.days)
    except Exception as e:
        raise Exception(f"Erro ao obter dados climáticos: {str(e)}")

def format_weather_data(weather_data: dict, days: int) -> list:
    """
    Formata os dados climáticos obtidos da API para exibição.
    """
    try:
        formatted_weather = []
        for day in weather_data["list"][:days]:
            formatted_weather.append({
                "data": datetime.fromtimestamp(day["dt"]).strftime("%d/%m/%Y"),
                "temperatura": f"{round(day['main']['temp'])}°C",
                "clima": day["weather"][0]["description"],
                "umidade": f"{day['main']['humidity']}%",
            })
        return formatted_weather
    except KeyError as e:
        raise Exception(f"Erro ao formatar dados climáticos: {str(e)}")
