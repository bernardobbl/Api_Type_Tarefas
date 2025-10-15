# 🏥 API de Gerenciador de Tarefas

Uma API REST completa para gerenciamento de tarefas construída com Node.js, TypeScript, Prisma e PostgreSQL.

## 📋 Funcionalidades

- ✅ **Autenticação com JWT** - Rotas seguras com login e geração de token.
- ✅ **Gerenciamento de Usuários** - CRUD completo para usuários com senhas criptografadas.
- ✅ **Gerenciamento de Tarefas** - CRUD completo de tarefas associadas a usuários.
- ✅ **Gerenciamento de Categorias** - CRUD completo para categorizar tarefas.
- ✅ **Documentação Swagger** - API totalmente documentada e interativa.

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação da API
- **JSON Web Token (JWT)** - Para autenticação baseada em token
- **Bcrypt.js** - Para hashing de senhas

---

## 📦 Instalação

### 🔧 Pré-requisitos
- **Node.js 18+**  
- **PostgreSQL 15+**  
- **npm** ou **yarn**

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

## 👥 Equipe

Este projeto foi desenvolvido pelas seguintes pessoas:

[<br><sub>**Bernardo Barcellos Leite**</sub><br>](https://github.com/bernardobbl)[<br><sub>**Bruno Nathan de Lima Cruz**</sub><br>](https://github.com/brunotan14)[<br><sub>**João Victor Araújo de Andrade**</sub><br>](https://github.com/Devjv10)[<br><sub>**Rafael Luna de Souza**</sub><br>](https://github.com/rafaelpb1)

