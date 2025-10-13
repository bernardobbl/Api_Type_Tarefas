import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário de exemplo
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'usuario@exemplo.com' },
    update: {},
    create: {
      email: 'usuario@exemplo.com',
      name: 'Usuário Exemplo',
      password: hashedPassword,
    },
  });

  // Criar categorias de exemplo com funcionalidades avançadas
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Trabalho',
        description: 'Tarefas relacionadas ao trabalho e projetos profissionais',
        color: '#3B82F6',
      },
    }),
    prisma.category.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Estudos',
        description: 'Cursos, leituras e atividades de aprendizado',
        color: '#10B981',
      },
    }),
    prisma.category.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Pessoal',
        description: 'Tarefas pessoais e atividades do dia a dia',
        color: '#F59E0B',
      },
    }),
    prisma.category.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Saúde',
        description: 'Exercícios, consultas médicas e cuidados com a saúde',
        color: '#EF4444',
      },
    }),
    prisma.category.upsert({
      where: { id: 5 },
      update: {},
      create: {
        name: 'Arquivadas',
        description: 'Categorias antigas que não são mais usadas',
        color: '#6B7280',
      },
    }),
  ]);

  // Criar tarefas de exemplo
  const tasks = await Promise.all([
    prisma.task.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Reunião com cliente',
        description: 'Apresentar proposta do projeto',
        priority: 'HIGH',
        completed: false,
        userId: user.id,
        categoryId: categories[0].id,
      },
    }),
    prisma.task.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Estudar TypeScript',
        description: 'Capítulos 5-8 do curso',
        priority: 'MEDIUM',
        completed: false,
        userId: user.id,
        categoryId: categories[1].id,
      },
    }),
    prisma.task.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: 'Comprar presentes',
        description: 'Aniversário da mãe',
        priority: 'LOW',
        completed: true,
        userId: user.id,
        categoryId: categories[2].id,
      },
    }),
  ]);

  console.log('✅ Seed executado com sucesso!');
  console.log('👤 Usuário criado:', user.email);
  console.log('📁 Categorias criadas:', categories.length);
  console.log('📝 Tarefas criadas:', tasks.length);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


