# 🏥 API de Gerenciador de Tarefas

Uma API REST completa para gerenciamento de tarefas construída com Node.js, TypeScript, Prisma e PostgreSQL.

## 📋 Funcionalidades

- ✅ **Gerenciamento de Tarefas** - CRUD completo
- ✅ **Gerenciamento de Categorias** - CRUD completo
- ✅ **Documentação Swagger** - API totalmente documentada
- ✅ **Banco PostgreSQL** - Persistência de dados confiável

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Swagger** - Documentação da API

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

### **Endpoints Principais**

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
enum Priority {
  LOW
  MEDIUM
  HIGH
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  tasks Task[]

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

  @@map("tasks")
}
```

## 👥 Equipe

Este projeto foi desenvolvido pelas seguintes pessoas:

| [<br><sub>**Bernardo Barcellos Leite**</sub><br>](https://github.com/bernardobbl) | [<br><sub>**Bruno Nathan de Lima Cruz**</sub><br>](https://github.com/brunotan14) | [<br><sub>**João Victor Araújo de Andrade**</sub><br>](https://github.com/Devjv10) | [<br><sub>**Rafael Luna de Souza**</sub><br>](https://github.com/rafaelpb1) |

