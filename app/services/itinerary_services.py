import openai
import requests
from app.models.itinerary import ItineraryRequest

# Configurações
OPENAI_API_KEY = "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"
WEATHER_API_KEY = "4966a6c113f408cdaa2656b598f7cecd"  
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

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
