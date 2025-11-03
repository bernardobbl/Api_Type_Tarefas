# Como executar o Frontend

## 1. Instalar dependências

```bash
cd frontend
npm install
```

## 2. Executar o frontend

```bash
npm run dev
```

O frontend será iniciado em **http://localhost:5173**

## 3. Importante

- Certifique-se de que o **backend está rodando na porta 3000** antes de iniciar o frontend
- O backend foi configurado com CORS para aceitar requisições do frontend
- O frontend está configurado para se conectar automaticamente ao backend em `http://localhost:3000`

## 4. Funcionalidades implementadas

✅ Login e registro de usuários
✅ Criação, edição e exclusão de tarefas
✅ Marcar tarefas como concluídas
✅ Gerenciamento de prioridades (Alta, Média, Baixa)
✅ Gerenciamento de categorias
✅ Associação de categorias às tarefas
✅ Proteção de rotas com autenticação
✅ Armazenamento de token no localStorage

## 5. Estrutura de pastas

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.tsx          # Layout principal com navegação
│   │   └── ProtectedRoute.tsx  # Proteção de rotas
│   ├── pages/
│   │   ├── Login.tsx           # Página de login
│   │   ├── Register.tsx        # Página de registro
│   │   ├── Tasks.tsx           # Página de gerenciamento de tarefas
│   │   └── Categories.tsx      # Página de gerenciamento de categorias
│   ├── services/
│   │   └── api.ts              # Serviços de comunicação com a API
│   ├── types.ts                # Definições de tipos TypeScript
│   ├── App.tsx                 # Componente principal com rotas
│   ├── main.tsx                # Ponto de entrada
│   └── index.css               # Estilos globais
├── package.json
├── vite.config.ts
└── tsconfig.json
```

