
# Documentação do Sistema de Geração de Itinerários de Viagem 📚

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Banco de Dados](#banco-de-dados)
6. [Guias de Uso](#guias-de-uso)
7. [Testes](#testes)
8. [Manutenção](#manutenção)
9. [Segurança](#segurança)

---

## Visão Geral

### Descrição do Projeto
Sistema web desenvolvido para criar itinerários de viagem personalizados automaticamente, integrando preferências do usuário e destinos específicos. Ele também oferece integração com previsões meteorológicas para ajudar no planejamento.

### Objetivos
- Automatizar a criação de roteiros de viagem.
- Fornecer sugestões personalizadas.
- Exibir informações meteorológicas do destino.
- Facilitar o planejamento de viagens.

---

## Arquitetura

### Estrutura do Sistema
```plaintext
projeto/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   │   └── itinerary.py
│   │   ├── services/
│   │   │   └── itinerary_services.py
│   │   └── utils/
│   │       └── config.py
│   └── tests/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Form.js
│       │   └── ItineraryResult.js
│       ├── services/
│       │   └── api.js
│       └── assets/
│           └── css/
│               └── styles.css
└── README.md
```

---

## Backend

### Endpoints da API

#### Geração de Itinerário
- **Método**: `POST`
- **Endpoint**: `/generate-itinerary`

**Parâmetros de entrada**:
```json
{
    "destination": "string",
    "days": "integer",
    "preferences": "string"
}
```

**Exemplo de resposta**:
```json
{
    "itinerario": {
        "destino": "string",
        "dias": "integer",
        "roteiro": {
            "conteudo": "string"
        }
    },
    "previsao_tempo": {
        "list": [
            {
                "dt": "integer",
                "main": { "temp": "float", "humidity": "integer" },
                "weather": [ { "description": "string" } ]
            }
        ]
    }
}
```

#### Status da API
- **Método**: `GET`
- **Endpoint**: `/`

**Exemplo de resposta**:
```json
{
    "message": "API funcionando!"
}
```

### Modelos de Dados
```python
class ItineraryRequest(BaseModel):
    destination: str
    days: int
    preferences: str = "pontos turísticos populares"
```

---

## Frontend

### Componentes Principais

#### Formulário de Geração
- **Arquivo**: `Form.js`
- **Descrição**: Permite ao usuário inserir o destino, número de dias e preferências para gerar o itinerário.

#### Exibição de Itinerário
- **Arquivo**: `ItineraryResult.js`
- **Descrição**: Exibe o itinerário gerado e a previsão do tempo.

---

## Banco de Dados

### Estrutura
Embora o sistema atual não dependa diretamente de um banco de dados, uma sugestão para implementação futura é:

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
    itinerary_id INTEGER REFERENCES itineraries(id),
    description TEXT,
    time TIME,
    location VARCHAR(200)
);
```

---

## Guias de Uso

### Configuração do Ambiente

#### Backend
```bash
# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt
```

#### Frontend
```bash
# Instalar dependências
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` no diretório `backend/app/` com as seguintes configurações:

```env
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
```

### Execução

#### Backend
```bash
uvicorn app.main:app --reload
```

#### Frontend
```bash
npm start
```

---

## Testes

### Backend
```bash
# Executar testes
pytest
```

```bash
# Cobertura de testes
pytest --cov
```

### Frontend
```bash
# Executar testes
npm test
```

```bash
# Modo de observação
npm test -- --watch
```

---

## Manutenção

### Logs
- Os logs do backend são gerados automaticamente e podem ser configurados no arquivo principal.
- Para logs persistentes, configure o uso de um sistema como o `Loguru` ou serviços em nuvem.

---

## Segurança

### Autenticação
- Implemente autenticação com **JWT Tokens** (opcional).

### Validações
- Todos os inputs do usuário são sanitizados para evitar ataques de **SQL Injection** ou **XSS**.
- O CORS está configurado para permitir apenas origens confiáveis.

---

## Métricas e Monitoramento

Recomenda-se configurar ferramentas como **Prometheus** ou **New Relic** para monitorar:
- Tempo de resposta das APIs.
- Taxa de erro.
- Uso de recursos do servidor.

---

📝 **Nota**: Esta documentação deve ser atualizada conforme o sistema evolui.

🔄 **Última atualização**: [20/11/2024]
