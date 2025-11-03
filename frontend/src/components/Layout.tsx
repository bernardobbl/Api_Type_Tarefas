import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TEMPORÁRIO: Logout desabilitado
    // localStorage.removeItem('token');
    // navigate('/login');
    alert('Sistema em modo de teste - Login desabilitado temporariamente');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav
        style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Sistema de Tarefas</h1>
          <Link
            to="/tasks"
            style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
          >
            Tarefas
          </Link>
          <Link
            to="/categories"
            style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
          >
            Categorias
          </Link>
        </div>
        <span style={{ color: '#f39c12', fontSize: '0.875rem' }}>
          ⚠️ Modo de teste - Autenticação desabilitada
        </span>
      </nav>
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
}

