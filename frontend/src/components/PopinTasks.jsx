import { Home, Trash, X } from "lucide-react";

const emojiOptions = [
  "",
  "😀",
  "🎯",
  "💼",
  "🏠",
  "🛒",
  "📚",
  "💡",
  "🧠",
  "🧹",
  "🍽️",
  "🧘",
  "💻",
  "📅",
  "🛠️",
  "🚀",
  "🎉",
];

const PopinTasks = ({
  buttonToggle,
  categories = [],
  onAddCategory,
  onRemoveCategory,
  categoryName,
  setCategoryName,
  categoryEmoji,
  setCategoryEmoji,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-10"></div>
      <div className="fixed flex flex-col gap-4 w-4/7 xl:w-1/5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl py-5 px-5 shadow-md z-20">
        <div className="flex justify-between">
          <span className="font-bold text-md xl:text-2xl">
            Gérer les catégories
          </span>
          <button onClick={() => buttonToggle()}>
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Entrez votre catégorie"
            className="border-1 text-sm border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
          />
          <select
            value={categoryEmoji}
            onChange={(e) => setCategoryEmoji(e.target.value)}
            className="border-1 text-sm border-gray-300 px-3 py-2 rounded-md w-24"
            aria-label="Choisir un emoji"
          >
            {emojiOptions.map((emoji, idx) => (
              <option key={idx} value={emoji}>
                {emoji === "" ? "Aucun" : emoji}
              </option>
            ))}
          </select>
          <button
            className="self-start cursor-pointer bg-green-600 text-white rounded-md px-3 py-2"
            onClick={onAddCategory}
          >
            Ajouter
          </button>
        </div>
        <span>Catégories existantes</span>
        {categories.length === 0 ? (
          <div className="text-sm text-gray-500">Aucune catégorie</div>
        ) : (
          categories.map((c) => (
            <div
              key={c.id}
              className="flex justify-between bg-gray-100 px-1 py-2 rounded-md"
            >
              <div className="flex gap-2">
                <Home />
                <span>{(c.emoji ? c.emoji + " " : "") + c.name}</span>
              </div>
              <div>
                <Trash
                  className="cursor-pointer"
                  onClick={() => onRemoveCategory(c.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PopinTasks;
