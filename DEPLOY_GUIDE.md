# 📦 Deploy da API de Agendamento Clínico (Node.js + TypeORM) no Render

Este guia ensina como realizar o deploy de uma API Node.js com TypeORM utilizando Docker e Render.com.

---

## 🛠 Pré-requisitos

- Conta no [Render](https://render.com/)
- Projeto publicado no GitHub
- Banco de dados PostgreSQL (local ou provisionado pelo Render)
- Docker instalado para testes locais (opcional)

---

## 📁 Estrutura esperada do projeto

Certifique-se de que o projeto possui os seguintes arquivos:

- `Dockerfile`
- `render.yaml` (opcional, para infra como código)
- `.env` com as variáveis de ambiente necessárias
- `package.json` com scripts `start`, `build` e `dev`
- `tsconfig.json` com `outDir`, `rootDir` e libs definidas

---

## 📄 Dockerfile (exemplo)

```dockerfile
# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## ⚙️ Variáveis de ambiente no Render

Adicione estas variáveis manualmente no dashboard do Render (Settings > Environment):

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=clinic_db
```

Ou se usar `DATABASE_URL`, siga este formato:

```env
DATABASE_URL=postgres://postgres:postgres@<host>:5432/clinic_db
```

---

## 🚀 Etapas para Deploy no Render

1. **Acesse**: https://render.com
2. Clique em **"New Web Service"**
3. Escolha **"Connect a repository"** e selecione seu projeto do GitHub
4. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version** (opcional): `18` ou `16`
5. Adicione as **variáveis de ambiente** necessárias
6. Clique em **"Create Web Service"**

---

## ✅ Após o Deploy

- Acesse a URL gerada pelo Render, ex:  
  `https://clinic-api-xxxxx.onrender.com`

- Use essa URL no Postman para testar as rotas:
  ```
  GET    /patients
  POST   /doctors
  POST   /appointments
  ...
  ```

---

## 🧪 Teste no Postman

Troque a URL base dos testes locais por:  
`https://clinic-api-xxxxx.onrender.com`

---

## 🧯 Dicas de Debug

- Verifique os **logs de build** no Render (aba Logs)
- Confirme que **todas dependências** estão instaladas (`express`, `typeorm`, etc.)
- Certifique-se que o script `build` está funcionando localmente

---

## 🧾 Licença

Este projeto é livre para uso e aprendizado. Compartilhe com outros desenvolvedores! 🚀
