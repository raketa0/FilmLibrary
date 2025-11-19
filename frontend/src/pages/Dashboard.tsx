import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="max-w-5xl mx-auto card">
      <h2 className="text-xl font-semibold mb-4">Привет, {user?.name}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white/3 rounded-lg">Избранное<br /><small className="text-white/60">Пока пусто</small></div>
        <div className="p-4 bg-white/3 rounded-lg">История просмотров<br /><small className="text-white/60">Пока пусто</small></div>
        <div className="p-4 bg-white/3 rounded-lg">Рекомендации<br /><small className="text-white/60">Пока пусто</small></div>
      </div>
    </div>
  );
}
