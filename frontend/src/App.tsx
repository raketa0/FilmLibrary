import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { useAuthStore } from './store/authStore';

const Protected: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuthStore((s: { user: any; }) => s.user);
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
