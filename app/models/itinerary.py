from pydantic import BaseModel

class ItineraryRequest(BaseModel):
    destination: str
    days: int
    preferences: str = "pontos turísticos populares"

class ItineraryResponse(BaseModel):
    itinerary: str
    weather: dict
