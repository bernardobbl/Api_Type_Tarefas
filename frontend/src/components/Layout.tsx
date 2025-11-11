import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav
        style={{
          backgroundColor: 'rgb(30, 58, 95)',
          color: 'white',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: 'Sans-serif' }}>Sistema de Tarefas</h1>
          <Link
            to="/tasks"
            style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
          >
            Tarefas
          </Link>
          <Link
            to="/categories"
            style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 0.5rem' }}
          >
            Categorias
          </Link>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </nav>
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
    </div>
  );
}

