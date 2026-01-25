import type { FC } from "react";

const BASE_URL = "http://localhost:5084/store";

type PersonCardProps = {
  person: any;
  selected: boolean;
  onToggle: () => void;
};

const PersonCard: FC<PersonCardProps> = ({ person, selected, onToggle }) => {
  return (
    <label className="flex items-center space-x-2 p-1 hover:bg-white/5 rounded cursor-pointer">
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <img
        src={person.linkToPhoto ? `${BASE_URL}/${person.linkToPhoto}` : "/avatar.png"}
        alt={person.name}
        className="w-10 h-10 rounded-full object-cover border border-white/20"
        onError={(e: any) => { e.target.src = "/avatar.png"; }}
      />
      <span>{person.name} ({person.careerName || person.career?.name || "не выбрано"})</span>
    </label>
  );
};

export default PersonCard;