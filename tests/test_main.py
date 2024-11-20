from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API funcionando!"}

def test_generate_itinerary():
    payload = {
        "destination": "Rio de Janeiro",
        "days": 5,
        "preferences": "praias e trilhas"
    }
    response = client.post("/generate-itinerary", json=payload)
    assert response.status_code == 200
    assert "itinerary" in response.json()
    assert "weather" in response.json()
