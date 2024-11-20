from fastapi import FastAPI
from app.services.itinerary_services import generate_itinerary_services
from app.models.itinerary import ItineraryRequest
from fastapi.middleware.cors import CORSMiddleware

# Inicializar FastAPI
app = FastAPI()

# Configurar middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajustar para domínios específicos em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Teste inicial
@app.get("/")
async def root():
    return {"message": "API funcionando!"}

# Rota para gerar itinerário
@app.post("/generate-itinerary")
async def generate_itinerary(request: ItineraryRequest):
    return await generate_itinerary_services(request)
