![Node.js](https://img.shields.io/badge/Node.js-22.14-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)
![Prisma](https://img.shields.io/badge/ORM-Prisma-purple)

# 🏥 API de Gerenciador de Tarefas

Uma API REST completa para gerenciamento de tarefas construída com Node.js, TypeScript, Prisma e PostgreSQL, totalmente containerizada com Docker.

## 📋 Funcionalidades

- ✅ **Autenticação com JWT** - Rotas seguras com login e geração de token.
- ✅ **Gerenciamento de Usuários** - CRUD completo para usuários com senhas criptografadas.
- ✅ **Gerenciamento de Tarefas** - CRUD completo de tarefas associadas a usuários.
- ✅ **Gerenciamento de Categorias** - CRUD completo para categorizar tarefas.
- ✅ **Documentação Swagger** - API totalmente documentada e interativa.
- ✅ **Docker Ready** - Ambiente completo containerizado, funciona em qualquer máquina.

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação da API
- **JSON Web Token (JWT)** - Para autenticação baseada em token
- **Zod** - Validação de schemas e dados
- **Bcrypt.js** - Para hashing de senhas

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool e dev server

### Infraestrutura
- **Docker** & **Docker Compose** - Containerização completa

---

## 📦 Instalação

### 🔧 Pré-requisitos

Você só precisa ter instalado:

- [Docker](https://docs.docker.com/get-docker/) (versão 20.10 ou superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (versão 1.29 ou superior)

> **✨ Vantagem do Docker:** Você **NÃO precisa** instalar Node.js, PostgreSQL ou qualquer outra dependência manualmente!

#### Verificar instalação do Docker

```bash
docker --version
docker-compose --version
```

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/bernardobbl/Api_Type_Tarefas.git
cd Api_Type_Tarefas
```

### 2. Configure as variáveis de ambiente

**⚠️ IMPORTANTE:** Você precisa criar o arquivo `.env` em **dois lugares**:

#### 2.1. Criar `.env` na raiz do projeto (para o Backend Node.js):

```bash
cp .env.example .env
```

#### 2.2. Criar `.env` na pasta backend (para o Prisma CLI):

```bash
cp backend/.env.example backend/.env
```

#### 2.3. Edite ambos os arquivos `.env` e configure as variáveis:

**Para desenvolvimento local (sem Docker):**
```env
# Database - use 'localhost' para desenvolvimento local
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/gerenciado_tarefas?schema=public"

# JWT
JWT_SECRET="sua_chave_secreta_super_segura_aqui"

# Server
PORT=3000

# Ambiente
NODE_ENV="development"
```

**Para Docker Compose:**
```env
# Database - use 'db' como host (nome do serviço Docker)
DATABASE_URL="postgresql://postgres:postgres@db:5432/tasks_db?schema=public"

# JWT
JWT_SECRET="sua_chave_secreta_super_segura_aqui"

# Server
PORT=3000

# Ambiente
NODE_ENV="development"
```

> **⚠️ Importante:** 
> - Altere o `JWT_SECRET` para uma chave secreta forte! Você pode gerar uma com:
>   ```bash
>   openssl rand -base64 32
>   ```
> - Os arquivos `.env` não serão commitados no Git (estão no .gitignore)
> - Cada desenvolvedor deve criar seus próprios `.env` a partir dos `.env.example`
> - **Ambos os arquivos `.env` devem ter o mesmo conteúdo** (raiz e backend/)

### 3. Inicie o projeto com Docker

```bash
# Build e inicia todos os containers
docker-compose up --build
```

Aguarde alguns segundos e acesse:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api-docs
- **PostgreSQL:** localhost:5432

### Executar em background

```bash
docker-compose up -d
```

### Parar os containers

```bash
docker-compose down
```

### Parar e remover dados do banco

```bash
docker-compose down -v
```

---

## 🛠️ Desenvolvimento Local (sem Docker)

Se preferir rodar localmente sem Docker:

### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado e rodando

### Passos

1. **Instale as dependências:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Configure o `.env`** (veja seção 2 acima)

3. **Inicie o PostgreSQL** (se não estiver rodando):
   ```bash
   # Mac com Homebrew
   brew services start postgresql@15
   ```

4. **Rode as migrations do Prisma:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Inicie os serviços em terminais separados:**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

   **Terminal 3 - Prisma Studio (opcional):**
   ```bash
   cd backend
   npx prisma studio
   ```

---

## 📚 Documentação da API

### **Swagger UI**

Acesse a documentação interativa em:
**http://localhost:3000/api-docs**

### 🔑 Fluxo de Autenticação

1.  **Crie um usuário:** Use o endpoint `POST /users`.
2.  **Faça login:** Use o endpoint `POST /login` com o email e senha do usuário criado/existente.
3.  **Copie o `token`** retornado na resposta do login.
4.  **Autorize suas requisições:** Para acessar as rotas protegidas, clique no botão **"Authorize"** no topo da página do Swagger e cole o token no formato `Bearer SEU_TOKEN_AQUI`.

### **Endpoints Principais**

#### 👤 Autenticação e Usuários
- `POST /users` - Criar um novo usuário.
- `POST /login` - Autenticar um usuário e receber um token JWT.
- `GET /users` - Listar todos os usuários (Rota Protegida).
- `PUT /users/:id` - Atualizar um usuário (Rota Protegida).
- `DELETE /users/:id` - Deletar um usuário (Rota Protegida).

#### 👤 **Tarefas**

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas
- `PUT /tasks/:id` - Atualizar
- `DELETE /tasks/:id` - Deletar

#### 🏥 **Categorias**

- `POST /categories` - Criar categoria
- `GET /categories` - Listar todas
- `PUT /categories/:id` - Atualizar
- `DELETE /categories/:id` - Deletar

## 🧪 Testando a API

### **Usando Swagger**

1. Acesse: http://localhost:3000/api-docs
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os dados e clique em "Execute"

---

## 🔧 Comandos úteis do Docker

### Executar migrations do Prisma

```bash
# Entre no container do backend
docker exec -it api_tarefas_backend sh

# Execute a migration
npx prisma migrate dev --name nome_da_migration

# Ou execute migrations já existentes
npx prisma migrate deploy

# Saia do container
exit
```

### Acessar o banco de dados

```bash
# Entre no container do PostgreSQL
docker exec -it api_tarefas_db psql -U postgres -d tasks_db

# Comandos úteis:
# \dt          - listar tabelas
# \d User      - ver estrutura da tabela User
# SELECT * FROM users;  - ver todos os usuários
# \q           - sair
```

### Visualizar Prisma Studio

```bash
# Entre no container do backend
docker exec -it api_tarefas_backend sh

# Inicie o Prisma Studio
npx prisma studio

# Acesse: http://localhost:5555
```

### Adicionar novas dependências

```bash
# Backend
docker exec -it api_tarefas_backend npm install nome-do-pacote

# Frontend
docker exec -it api_tarefas_frontend npm install nome-do-pacote

# Depois reconstrua os containers
docker-compose down
docker-compose up --build
```

---

## 🐛 Troubleshooting

### Container do backend não inicia

```bash
# Verifique os logs
docker-compose logs backend

# Certifique-se de que o arquivo .env existe e está correto
cat .env
```

### Erro de conexão com o banco

```bash
# Verifique se todos os containers estão rodando
docker ps

# Reinicie os containers
docker-compose restart
```

### Porta já em uso

```bash
# Linux/Mac:
lsof -i :3000
lsof -i :5173

# Windows (PowerShell):
netstat -ano | findstr :3000
```

### Reset completo do projeto

```bash
# Pare tudo e remova volumes
docker-compose down -v

# Remova imagens antigas
docker-compose build --no-cache

# Inicie novamente
docker-compose up --build
```

---

## 🗃️ Esquema do Banco de Dados

```prisma
// prisma/schema.prisma

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]

  @@map("users")
}

model Category {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  color       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tasks       Task[]

  @@map("categories")
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  categoryId  Int?
  category    Category? @relation(fields: [categoryId], references: [id])
  userId      Int
  user        User      @relation(fields: [userId], references: [id])

  @@map("tasks")
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

---

## 📦 Estrutura dos Containers

| Container | Porta | Descrição |
|-----------|-------|-----------|
| `api_tarefas_backend` | 3000 | API REST em Node.js + Swagger Docs |
| `api_tarefas_frontend` | 5173 | Interface React |
| `api_tarefas_db` | 5432 | Banco PostgreSQL |

---

## 👥 Equipe

Este projeto foi desenvolvido pelas seguintes pessoas:

[<br><sub>**Bernardo Barcellos Leite**</sub><br>](https://github.com/bernardobbl)[<br><sub>**Bruno Nathan de Lima Cruz**</sub><br>](https://github.com/brunotan14)[<br><sub>**João Victor Araújo de Andrade**</sub><br>](https://github.com/Devjv10)[<br><sub>**Rafael Luna de Souza**</sub><br>](https://github.com/rafaelpb1)

