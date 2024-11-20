import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv(dotenv_path="itinerario_viagens_2/.env")

class Config:
    API_KEY = os.getenv("API_KEY")
    WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
    WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast"

config = Config()
