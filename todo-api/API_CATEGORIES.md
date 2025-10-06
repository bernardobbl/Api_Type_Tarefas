# 📁 API de Categorias - Sistema Completo

## 🚀 **Funcionalidades Implementadas**

### **1. CRUD Básico**
- ✅ **GET** `/categories` - Listar categorias
- ✅ **POST** `/categories` - Criar categoria
- ✅ **PUT** `/categories/:id` - Atualizar categoria
- ✅ **DELETE** `/categories/:id` - Deletar categoria

### **2. Funcionalidades Avançadas**
- ✅ **PATCH** `/categories/:id/archive` - Arquivar/desarquivar
- ✅ **PATCH** `/categories/:id/default` - Definir como padrão
- ✅ **PATCH** `/categories/reorder` - Reordenar categorias
- ✅ **GET** `/categories/stats` - Estatísticas

---

## 📋 **Exemplos de Uso**

### **1. Buscar Categorias**
```bash
# Buscar todas as categorias de um usuário
GET /categories?userId=1

# Buscar com filtros avançados
GET /categories?userId=1&includeArchived=true&sortBy=name&search=trabalho
```

### **2. Criar Categoria**
```bash
POST /categories
{
  "name": "Projetos",
  "description": "Categoria para projetos pessoais",
  "color": "#8B5CF6",
  "icon": "🚀",
  "isDefault": false,
  "sortOrder": 1,
  "userId": 1
}
```

### **3. Atualizar Categoria**
```bash
PUT /categories/1
{
  "name": "Trabalho Atualizado",
  "description": "Nova descrição",
  "color": "#3B82F6",
  "icon": "💼",
  "isDefault": true
}
```

### **4. Arquivar Categoria**
```bash
PATCH /categories/1/archive
```

### **5. Definir Categoria Padrão**
```bash
PATCH /categories/2/default
```

### **6. Reordenar Categorias**
```bash
PATCH /categories/reorder
{
  "userId": 1,
  "categoryOrders": [
    { "id": 1, "sortOrder": 1 },
    { "id": 2, "sortOrder": 2 },
    { "id": 3, "sortOrder": 3 }
  ]
}
```

### **7. Deletar Categoria**
```bash
# Deletar forçando (remove todas as tarefas)
DELETE /categories/1?force=true

# Mover tarefas para outra categoria
DELETE /categories/1?moveTasksTo=2
```

### **8. Estatísticas**
```bash
GET /categories/stats?userId=1
```

---

## 🎨 **Campos da Categoria**

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `number` | ID único da categoria |
| `name` | `string` | Nome da categoria |
| `description` | `string?` | Descrição opcional |
| `color` | `string` | Cor em hexadecimal (padrão: #3B82F6) |
| `icon` | `string?` | Ícone/emoji da categoria |
| `isDefault` | `boolean` | Se é categoria padrão |
| `isArchived` | `boolean` | Se está arquivada |
| `sortOrder` | `number` | Ordem de exibição |
| `userId` | `number` | ID do usuário dono |
| `createdAt` | `DateTime` | Data de criação |
| `updatedAt` | `DateTime` | Data de atualização |

---

## 📊 **Resposta com Estatísticas**

```json
{
  "id": 1,
  "name": "Trabalho",
  "description": "Tarefas do trabalho",
  "color": "#3B82F6",
  "icon": "💼",
  "isDefault": true,
  "isArchived": false,
  "sortOrder": 1,
  "userId": 1,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "stats": {
    "total": 5,
    "completed": 2,
    "pending": 3
  }
}
```

---

## 🔍 **Filtros de Busca**

### **GET /categories**
- `userId` (obrigatório) - ID do usuário
- `includeArchived` - Incluir categorias arquivadas (true/false)
- `sortBy` - Ordenação (name, created, tasks)
- `search` - Busca por nome

### **Exemplos:**
```bash
# Buscar categorias ordenadas por nome
GET /categories?userId=1&sortBy=name

# Buscar categorias incluindo arquivadas
GET /categories?userId=1&includeArchived=true

# Buscar categorias com nome contendo "trabalho"
GET /categories?userId=1&search=trabalho
```

---

## ⚠️ **Validações e Regras**

1. **Nome único**: Não pode ter duas categorias com mesmo nome
2. **Categoria padrão**: Apenas uma categoria pode ser padrão por usuário
3. **Deletar categoria**: Precisa mover tarefas ou forçar exclusão
4. **Arquivar**: Categorias arquivadas não aparecem por padrão
5. **Ordenação**: Categorias são ordenadas por `sortOrder` por padrão

---

## 🎯 **Casos de Uso Comuns**

### **1. Organizar Categorias por Prioridade**
```bash
# Definir categoria mais importante como padrão
PATCH /categories/1/default

# Reordenar por importância
PATCH /categories/reorder
{
  "userId": 1,
  "categoryOrders": [
    { "id": 1, "sortOrder": 1 },  # Mais importante
    { "id": 2, "sortOrder": 2 },
    { "id": 3, "sortOrder": 3 }
  ]
}
```

### **2. Limpar Categorias Antigas**
```bash
# Arquivar categoria antiga
PATCH /categories/5/archive

# Deletar categoria vazia
DELETE /categories/5?force=true
```

### **3. Reorganizar Projeto**
```bash
# Mover todas as tarefas de uma categoria para outra
DELETE /categories/1?moveTasksTo=2

# Depois deletar a categoria vazia
DELETE /categories/1?force=true
```

---

## 🚀 **Próximos Passos**

1. **Execute as migrações**: `npm run db:migrate`
2. **Execute o seed**: `npm run db:seed`
3. **Teste os endpoints** com Postman ou curl
4. **Implemente autenticação** para segurança
5. **Adicione validações** com Joi ou Zod

---

## 💡 **Dicas de Uso**

- Use **cores diferentes** para identificar categorias rapidamente
- **Ícones** tornam a interface mais amigável
- **Categoria padrão** é útil para novas tarefas
- **Arquivar** é melhor que deletar para histórico
- **Estatísticas** ajudam na tomada de decisões
