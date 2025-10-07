<<<<<<< HEAD
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
=======
# 🧠 API de Gerenciamento de Tarefas

## 🎯 Sobre o Projeto
API REST completa para gerenciamento de tarefas com sistema avançado de categorias, desenvolvida em **TypeScript** com **PostgreSQL** e **Prisma ORM**.  
Inclui funcionalidades como **arquivamento**, **reordenação**, **estatísticas** e **relacionamentos complexos** entre usuários, tarefas e categorias.

---

## ✨ Funcionalidades

### 📋 Sistema de Tarefas
✅ CRUD completo de tarefas  
✅ Prioridades (**LOW**, **MEDIUM**, **HIGH**, **URGENT**)  
✅ Data de vencimento (`dueDate`)  
✅ Descrição detalhada  
✅ Filtros avançados (busca, prioridade, categoria)  
✅ Relacionamento com categorias e usuários  

### 📁 Sistema de Categorias Avançado
✅ CRUD completo de categorias  
✅ Cores personalizadas (hexadecimal)  
✅ Ícones/emojis para identificação  
✅ Categoria padrão (apenas uma por usuário)  
✅ Arquivar/desarquivar categorias  
✅ Reordenação personalizada (drag & drop)  
✅ Estatísticas completas (total, concluídas, pendentes)  
✅ Busca e filtros avançados  
✅ Validação de duplicação de nomes  

### 👤 Sistema de Usuários
✅ Autenticação preparada (email, senha)  
✅ Relacionamentos com tarefas e categorias  
✅ Isolamento de dados por usuário  

---

## 🛠️ Tecnologias Utilizadas
- **Backend:** Node.js + TypeScript + Express  
- **Banco de Dados:** PostgreSQL  
- **ORM:** Prisma  
- **Autenticação:** bcrypt (preparado)  
- **Validação:** Custom validations  
- **Documentação:** Markdown + Swagger (preparado)  
>>>>>>> 9dcd513ba212f5450637de3713c10a909c493ed5

---

## 📦 Instalação

### 🔧 Pré-requisitos
- **Node.js 18+**  
- **PostgreSQL 15+**  
- **npm** ou **yarn**

<<<<<<< HEAD
=======
Clone o repositório:
```bash
git clone https://github.com/bernardobbl/Api_Type_Tarefas.git
cd Api_Type_Tarefas/todo-api


⚙️ Configuração e Execução do Projeto

Instale as dependências:

npm install


Configure o banco de dados:

⚠️ TEM QUE CONFIGURAR O BANCO DE DADOS.

Edite o arquivo .env com suas credenciais:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"


Execute as migrações:

npm run db:migrate


Execute o seed (dados de exemplo):

npm run db:seed


Inicie o servidor:

npm run dev


🚀 Scripts Disponíveis:

npm run dev          # Iniciar servidor em desenvolvimento
npm run build        # Compilar TypeScript
npm run start        # Iniciar servidor em produção
npm run db:generate  # Gerar cliente Prisma
npm run db:migrate   # Executar migrações
npm run db:push      # Sincronizar schema com banco
npm run db:studio    # Abrir Prisma Studio
npm run db:seed      # Executar seed
>>>>>>> 9dcd513ba212f5450637de3713c10a909c493ed5
