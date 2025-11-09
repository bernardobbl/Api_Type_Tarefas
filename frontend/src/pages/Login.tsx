import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      
      const token = response?.token || response;
      
      if (!token) {
        setError('Token não recebido do servidor');
        setLoading(false);
        return;
      }
      
      localStorage.setItem('token', token);
      navigate('/tasks', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f1d2e 100%)',
        padding: '1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div
          style={{
            background: 'rgba(30, 50, 80, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            padding: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '200px',
                height: '50px',
                background: 'rgba(99, 102, 241, 0.07)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Bem-vindo</span>
            </div>
          </div>

          <h1
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '500',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Fazer login
          </h1>

          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '0.75rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                required
                style={{
                  width: '100%',
                  height: '56px',
                  padding: '0 1rem 0 3rem',
                  background: 'rgba(40, 60, 90, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(40, 60, 90, 0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.background = 'rgba(40, 60, 90, 0.4)';
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                style={{
                  width: '100%',
                  height: '56px',
                  padding: '0 1rem 0 3rem',
                  background: 'rgba(40, 60, 90, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.background = 'rgba(40, 60, 90, 0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.background = 'rgba(40, 60, 90, 0.4)';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '56px',
                background: loading
                  ? 'rgba(99, 102, 241, 0.5)'
                  : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(99, 102, 241, 0.4)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(99, 102, 241, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                }
              }}
            >
              {loading ? 'Entrando...' : 'Entrar na conta'}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.875rem',
            }}
          >
            Ainda não tem conta?{' '}
            <Link
              to="/register"
              style={{
                color: '#818cf8',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Cadastrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
