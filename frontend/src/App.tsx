import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Categories from './pages/Categories';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
 

 // Sem login temporariamente 
/* 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Categories from './pages/Categories';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; */