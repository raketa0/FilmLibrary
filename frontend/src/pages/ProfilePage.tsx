import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.linkToAvatar || '');

  if (!user) return null;

  const save = async () => {
    const res = await updateProfile(user.id, { name, linkToAvatar: avatar });
    if (!res.success) alert(res.error || 'Ошибка');
    else setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 p-6 flex flex-col items-center">
          <img src={user.linkToAvatar || '/avatar-default.png'} alt="avatar" className="w-36 h-36 rounded-full mb-4 border border-white/10" />
          {editing ? null : <h3 className="text-xl font-bold">{user.name}</h3>}
          <p className="text-sm text-white/70 mt-1">{user.email}</p>
        </div>

        <div className="col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-3">Профиль</h3>
          {!editing ? (
            <>
              <p className="mb-2"><span className="text-white/70">Имя:</span> {user.name}</p>
              <p className="mb-2"><span className="text-white/70">Email:</span> {user.email}</p>
              <button className="mt-4 px-4 py-2 rounded-md bg-brand-500" onClick={() => setEditing(true)}>Редактировать профиль</button>
            </>
          ) : (
            <div className="space-y-3">
              <div><label className="block text-sm">Имя</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" /></div>
              <div><label className="block text-sm">Ссылка на аватар</label><input value={avatar} onChange={e=>setAvatar(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-white/10" /></div>
              <div className="flex gap-3"><button onClick={save} className="px-4 py-2 rounded-md bg-brand-500">Сохранить</button><button onClick={()=>setEditing(false)} className="px-4 py-2 rounded-md bg-white/6">Отмена</button></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
