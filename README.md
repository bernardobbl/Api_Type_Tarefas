🎯 Sobre o Projeto:

API REST completa para gerenciamento de tarefas com sistema avançado de categorias, desenvolvida em TypeScript com PostgreSQL e Prisma ORM. Inclui funcionalidades como arquivamento, reordenação, estatísticas e relacionamentos complexos entre usuários, tarefas e categorias.
✨ Funcionalidades
📋 Sistema de Tarefas
✅ CRUD completo de tarefas
✅ Prioridades (LOW, MEDIUM, HIGH, URGENT)
✅ Data de vencimento (dueDate)
✅ Descrição detalhada
✅ Filtros avançados (busca, prioridade, categoria)
✅ Relacionamento com categorias e usuários

📁 Sistema de Categorias Avançado
✅ CRUD completo de categorias
✅ Cores personalizadas (hexadecimal)
✅ Ícones/emojis para identificação
✅ Categoria padrão (apenas uma por usuário)
✅ Arquivar/desarquivar categorias
✅ Reordenação personalizada (drag & drop)
✅ Estatísticas completas (total, concluídas, pendentes)
✅ Busca e filtros avançados
✅ Validação de duplicação de nomes
👤 Sistema de Usuários
✅ Autenticação preparada (email, senha)
✅ Relacionamentos com tarefas e categorias
✅ Isolamento de dados por usuário

🛠️ Tecnologias Utilizadas
Backend: Node.js + TypeScript + Express
Banco de Dados: PostgreSQL
ORM: Prisma
Autenticação: bcrypt (preparado)
Validação: Validações customizadas
Documentação: Markdown + Swagger (preparado)
📦 Instalação
Pré-requisitos
Node.js 18+
PostgreSQL 15+
npm ou yarn

1. Clone o repositório:
   
 git clone https://github.com/bernardobbl/Api_Type_Tarefas.git
 cd Api_Type_Tarefas/todo-api

3. Instale as dependências:

   npm install
   
4. Configure o banco de dados:

TEM QUE CONFIGURAR O BANCO DE DADOS.

6. Execute as migrações:
  
  npm run db:migrate

5. Execute o seed (dados de exemplo):

     npm run db:seed
   
7. Inicie o servidor:
   
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
