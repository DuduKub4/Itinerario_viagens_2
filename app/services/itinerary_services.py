import openai
import requests
from dotenv import load_dotenv
import os
from app.models.itinerary import ItineraryRequest

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Configurações
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

# Verificar se as chaves foram carregadas
if not OPENAI_API_KEY:
    raise ValueError("API Key da OpenAI não encontrada. Verifique o arquivo .env")
if not WEATHER_API_KEY:
    raise ValueError("API Key da Weather API não encontrada. Verifique o arquivo .env")

openai.api_key = OPENAI_API_KEY

async def generate_itinerary_service(request: ItineraryRequest):
    # Gerar itinerário com OpenAI
    prompt = (
        f"Crie um itinerário de {request.days} dias para {request.destination} com foco em {request.preferences}. "
        "Organize por dia, horários e inclua atividades detalhadas."
    )
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1000
        )
        itinerary = response.choices[0].text.strip()
    except Exception as e:
        raise Exception(f"Erro ao gerar itinerário: {str(e)}")

    # Obter previsão do tempo
    try:
        weather_response = requests.get(
            WEATHER_API_URL,
            params={
                "q": request.destination,
                "cnt": request.days * 8,  # Previsão a cada 3 horas (8 intervalos por dia)
                "appid": WEATHER_API_KEY,
                "units": "metric",  # Unidade métrica (Celsius)
                "lang": "pt_br"  # Idioma português
            }
        )
        weather_response.raise_for_status()
        weather_data = weather_response.json()
    except Exception as e:
        raise Exception(f"Erro ao obter dados climáticos: {str(e)}")

    # Retornar dados combinados
    return {
        "itinerary": itinerary,
        "weather": weather_data
    }
