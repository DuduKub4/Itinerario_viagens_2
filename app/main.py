from fastapi import FastAPI
from app.services.itinerary_services import generate_itinerary_service
from app.models.itinerary import ItineraryRequest
from fastapi.middleware.cors import CORSMiddleware

# Inicializar a aplicação FastAPI
def create_app() -> FastAPI:
    """
    Cria e configura a aplicação FastAPI com middleware e rotas.
    """
    app = FastAPI()

    # Configurar middleware CORS
    configure_cors(app)

    # Rotas
    configure_routes(app)

    return app

def configure_cors(app: FastAPI):
    """
    Configura o middleware CORS para o FastAPI.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Ajustar para domínios específicos em produção
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def configure_routes(app: FastAPI):
    """
    Configura as rotas da aplicação.
    """

    @app.get("/")
    async def root():
        """
        Rota de teste para verificar se a API está funcionando.
        """
        return {"message": "API funcionando!"}

    @app.post("/generate-itinerary")
    async def generate_itinerary(request: ItineraryRequest):
        """
        Rota para gerar o itinerário baseado nas preferências do usuário.
        """
        return await generate_itinerary_service(request)

# Criar a aplicação
app = create_app()
