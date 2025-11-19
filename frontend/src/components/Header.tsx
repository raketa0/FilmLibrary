import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="py-4 border-b border-white/6">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-2xl font-bold">🎬</div>
          <div>
            <div className="text-lg font-semibold">Фильмотека</div>
            <div className="text-xs text-white/60">Личный кабинет</div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8">Дашборд</Link>
              <button
                onClick={() => { logout(); nav('/'); }}
                className="px-3 py-1 rounded-md bg-red-600/80 hover:bg-red-500 transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/" className="px-3 py-1 rounded-md bg-white/6 hover:bg-white/8">Войти</Link>
          )}
        </div>
      </div>
    </header>
  );
}
