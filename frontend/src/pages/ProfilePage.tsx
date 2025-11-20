import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UpdateProfileDto } from "../types/UserDto";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, updateProfile, uploadAvatar, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (user && !initialized) {
      setName(user.name);
      setEmail(user.email);
      setDateOfBirth(user.dateOfBirth?.substring(0, 10) ?? "");
      setPreview(user.linkToAvatar ? `http://localhost:5084/store/${user.linkToAvatar}` : null);
      setInitialized(true);
    }
  }, [user, initialized]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileSelect = (file: File) => {
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const saveChanges = async () => {
    if (!user) return;

    const dto: UpdateProfileDto = {
      name,
      email,
      dateOfBirth,
      password: password || undefined,
      confirmPassword: password || undefined,
    };

    const resProfile = await updateProfile(user.id, dto);

    if (!resProfile.success) {
      alert(resProfile.error || "Ошибка обновления профиля");
      return;
    }

    if (avatarFile) {
      const resAvatar = await uploadAvatar(user.id, avatarFile);
      if (!resAvatar.success) {
        alert(resAvatar.error || "Ошибка загрузки аватара");
        return;
      }
      if (resAvatar.user?.linkToAvatar) {
        setPreview(`http://localhost:5084/store/${resAvatar.user.linkToAvatar}`);
      }
    }

    alert("Профиль успешно обновлён!");
    setPassword("");
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmed = window.confirm("Вы уверены, что хотите удалить свой аккаунт? Это действие необратимо!");
    if (!confirmed) return;

    const res = await deleteAccount(user.id);
    if (!res.success) {
      alert(res.error || "Ошибка удаления аккаунта");
      return;
    }

    alert("Аккаунт удалён");
    navigate("/");
  };

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="max-w-xl mx-auto text-white">
      <h1 className="text-3xl mb-6">Редактирование профиля</h1>

      {/* Аватар */}
      <div
        className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-white/20 cursor-pointer flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Аватар" />
        ) : (
          <span>Перетащи фото</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="mt-3"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
      />

      {/* Имя */}
      <label className="block mt-6">Имя</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mt-1 px-3 py-2 bg-transparent border border-white/10 rounded"
      />

      {/* Email */}
      <label className="block mt-4">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 px-3 py-2 bg-transparent border border-white/10 rounded"
      />

      {/* Дата рождения */}
      <label className="block mt-4">Дата рождения</label>
      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className="w-full mt-1 px-3 py-2 bg-transparent border border-white/10 rounded"
      />

      {/* Пароль */}
      <label className="block mt-4">Новый пароль (необязательно)</label>
      <input
        type="password"
        placeholder="Оставьте пустым"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-1 px-3 py-2 bg-transparent border border-white/10 rounded"
      />

      <button
        onClick={saveChanges}
        className="mt-6 w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition"
      >
        Сохранить
      </button>

      {/* Кнопка удаления аккаунта */}
      <button
        onClick={handleDelete}
        className="mt-4 w-full py-3 bg-red-600 rounded hover:bg-red-500 transition"
      >
        Удалить аккаунт
      </button>
    </div>
  );
}
