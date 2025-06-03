# Clinic API

API RESTful para gerenciamento de pacientes, médicos e agendamentos em uma clínica.

## 🚀 Tecnologias

- Node.js
- Express
- TypeORM
- PostgreSQL
- Docker
- TypeScript

## 📦 Funcionalidades

- Cadastro de pacientes
- Cadastro de médicos
- Agendamento de consultas
- Listagem de agendamentos por médico e por paciente

## ⚙️ Como rodar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Criar o arquivo `.env`

Baseie-se no arquivo `.env.example` e crie seu próprio `.env`.

### 3. Subir com Docker

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`

## 🧪 Endpoints

### Criar paciente

```
POST /patients
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

## 📝 Licença

Este projeto é de uso livre para fins educacionais.