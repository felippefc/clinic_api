# 🏥 Clínica API - Sistema de Agendamento Médico

Esta é uma API RESTful para gerenciamento de **pacientes, médicos e agendamentos**, desenvolvida com Node.js, Express e TypeORM. Ideal para clínicas médicas ou consultórios que precisam organizar seus atendimentos.

---

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **TypeORM**
- **PostgreSQL**
- **Class-validator** (validações)
- **Class-transformer** (DTOs)
- **TypeScript**

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/clinica-api.git
cd clinica-api
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados no arquivo `.env` ou `data-source.ts`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=senha
DB_NAME=clinica
```

4. Rode as migrations (se houver):

```bash
npm run typeorm migration:run
```

5. Inicie o servidor:

```bash
npm run dev
```

A API estará rodando em: **http://localhost:3000**

---

## 🛠️ Estrutura de Pastas

```
src/
├── controllers/       # Lógica das rotas
├── entities/          # Entidades TypeORM (Paciente, Médico, Agendamento)
├── dtos/              # DTOs com validação (class-validator)
├── routes/            # Rotas Express
├── errors/            # Tratamento de erros personalizado
├── middlewares/       # Middlewares como errorHandler
├── data-source.ts     # Configuração do banco de dados
└── app.ts             # Inicialização do servidor
```

---

## 📚 Endpoints

### 🧑‍⚕️ Médicos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/doctors` | Listar todos os médicos |
| GET | `/api/doctors/:id` | Buscar um médico |
| POST | `/api/doctors` | Criar um novo médico |
| PUT | `/api/doctors/:id` | Atualizar médico |
| DELETE | `/api/doctors/:id` | Deletar médico |

### 🧑 Pacientes
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/patients` | Listar todos os pacientes |
| GET | `/api/patients/:id` | Buscar um paciente |
| POST | `/api/patients` | Criar um novo paciente |
| PUT | `/api/patients/:id` | Atualizar paciente |
| DELETE | `/api/patients/:id` | Deletar paciente |

### 📅 Agendamentos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/appointments` | Listar todos os agendamentos (filtro por doctorId/patientId) |
| POST | `/api/appointments` | Criar um agendamento |
| GET | `/api/appointments/:id` | Ver agendamento |
| DELETE | `/api/appointments/:id` | Cancelar agendamento |

---

## ✅ Validações no Agendamento

- ❌ Não permite agendar em datas passadas
- ❌ Horários fora do expediente (08:00–18:00)
- ❌ Conflito de horário para médicos e pacientes

---

## 📫 Contato

Desenvolvido por [Seu Nome]  
Email: seuemail@example.com  
LinkedIn: [linkedin.com/in/seunome](https://linkedin.com/in/seunome)

---