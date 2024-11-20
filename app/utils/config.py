import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv(dotenv_path="itinerario_viagens_2/.env")

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "sua-api-key-gemini")
    WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "sua-api-key-weather")
    WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

config = Config()
