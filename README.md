# Documentação do Sistema de Geração de Itinerários de Viagem 📚

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Banco de Dados](#banco-de-dados)
6. [APIs](#apis)
7. [Guias de Uso](#guias-de-uso)

## Visão Geral

### Descrição do Projeto
Sistema web desenvolvido para criar itinerários de viagem personalizados automaticamente, integrando preferências do usuário e destinos específicos.

### Objetivos
- Automatizar a criação de roteiros de viagem
- Fornecer sugestões personalizadas
- Facilitar o planejamento de viagens

## Arquitetura

### Estrutura do Sistema
```
projeto/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   └── services/
│   └── tests/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── styles/
    └── public/
```

## Backend

### Endpoints da API

#### 1. Geração de Itinerário
```python
POST /api/generate-itinerary

# Parâmetros de entrada
{
    "destination": string,
    "days": integer,
    "preferences": string
}

# Resposta
{
    "itinerary": [
        {
            "day": 1,
            "activities": [...]
        }
    ]
}
```

#### 2. Status da API
```python
GET /api/status

# Resposta
{
    "status": "online",
    "version": "1.0.0"
}
```

### Modelos de Dados
```python
class Itinerary:
    id: int
    destination: str
    days: int
    preferences: str
    activities: List[Activity]

class Activity:
    id: int
    description: str
    time: str
    location: str
```

## Frontend

### Componentes Principais

#### 1. Formulário de Geração
```javascript
// Form.js
/**
 * Componente de formulário principal
 * Props:
 * - onSubmit: Function
 * - loading: boolean
 */
```

#### 2. Exibição de Itinerário
```javascript
// ItineraryDisplay.js
/**
 * Exibe o itinerário gerado
 * Props:
 * - itinerary: Array
 * - onEdit: Function
 */
```

### Serviços

```javascript
// api.js
/**
 * Serviços de API
 */
const generateItinerary = async (data) => {
    // Implementação
};
```

## Banco de Dados

### Estrutura
```sql
CREATE TABLE itineraries (
    id SERIAL PRIMARY KEY,
    destination VARCHAR(100),
    days INTEGER,
    preferences TEXT,
    created_at TIMESTAMP
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    itinerary_id INTEGER,
    description TEXT,
    time TIME,
    location VARCHAR(200)
);
```

## Guias de Uso

### 1. Configuração do Ambiente

```bash
# Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
npm install
```

### 2. Variáveis de Ambiente
```env
# .env
DATABASE_URL=postgresql://user:password@localhost/dbname
API_KEY=your_api_key
PORT=8000
```

### 3. Execução

```bash
# Backend
uvicorn main:app --reload

# Frontend
npm start
```

## Testes

### Backend
```bash
# Executar testes
pytest

# Cobertura de testes
pytest --cov
```

### Frontend
```bash
# Executar testes
npm test

# Modo watch
npm test -- --watch
```

## Manutenção

### Logs
- Os logs são armazenados em `/var/log/app/`
- Formato: `YYYY-MM-DD HH:mm:ss [LEVEL] message`

### Backup
- Backup diário do banco às 00:00
- Armazenado em `/backup/`

## Segurança

### Autenticação
- JWT Token
- Expiração: 24 horas
- Refresh Token disponível

### Validações
- Sanitização de inputs
- Rate limiting: 100 requisições/hora
- CORS configurado

## Monitoramento

### Métricas
- Tempo de resposta
- Taxa de erro
- Uso de recursos

### Alertas
- Email em caso de erro crítico
- Monitoramento 24/7

## Suporte

### Contato
- Email: suporte@exemplo.com
- Tel: (11) 1234-5678

### FAQ
1. Como resetar a senha?
2. Como gerar novo token?
3. Limites de uso da API?

---

📝 **Nota**: Esta documentação deve ser atualizada conforme o sistema evolui.

🔄 **Última atualização**: [DATA]