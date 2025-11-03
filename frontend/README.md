# Frontend - Sistema de Tarefas

Frontend React com TypeScript para o Sistema de Gerenciamento de Tarefas.

## Requisitos

- Node.js 18+ 
- npm ou yarn

## Instalação

```bash
cd frontend
npm install
```

## Execução

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

**Importante**: Certifique-se de que o backend está rodando na porta 3000 antes de iniciar o frontend.

## Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Tarefas**: Criação, edição, exclusão e marcação de conclusão de tarefas
- **Categorias**: Gerenciamento de categorias para organizar tarefas
- **Prioridades**: Sistema de prioridades (Alta, Média, Baixa) para tarefas

## Estrutura

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços de API
│   └── types.ts        # Definições de tipos TypeScript
├── package.json
└── vite.config.ts      # Configuração do Vite
```

## Tecnologias

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios

