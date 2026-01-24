import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Привет, {user?.name}</h2>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/my-films" className="p-4 bg-gray-900 rounded-xl">
          Мои фильмы
        </Link>
        <Link to="/history" className="p-4 bg-gray-900 rounded-xl">
          История просмотров
        </Link>
      </div>
    </div>
  );
}