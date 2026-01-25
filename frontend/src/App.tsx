import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { useAuthStore } from './store/authStore';
import FilmsPage from './pages/FilmsPage';
import CreateFilmPage from './pages/CreateFilmPage';
import FilmPage from './pages/FilmPage';
import MyFilmsPage from './pages/MyFilmsPage';
import { AuthProvider } from './components/AuthContext';

const Protected: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuthStore((s: { user: any; }) => s.user);
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  const userId = useAuthStore((s: { user: any; }) => s.user?.id);
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/films/create" element={<CreateFilmPage />} />
            <Route path="/films/:id" element={<FilmPage />} />
            <Route path="*" element={<Navigate to="/films" replace />} />
            <Route path="/my-films" element={<MyFilmsPage userId={userId} />} />
          </Routes>
        </AuthProvider>
      </main>
    </div>
  );
}
