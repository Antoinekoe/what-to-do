import { X } from "lucide-react";
import { useState } from "react";
import PopinTasks from "./PopinTasks";

const AddTasks = () => {
  const [isToggle, setIsToggle] = useState(false);

  const buttonToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      {isToggle && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10"></div>

          <div className="fixed flex flex-col gap-4 w-1/5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl py-5 px-5 shadow-md z-20">
            <div className="flex justify-between">
              <span className="font-bold text-2xl">Gérer les catégories</span>
              <button onClick={() => buttonToggle()}>
                <X className="cursor-pointer" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Entrez votre catégorie"
              className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
            />
            <button className="self-start cursor-pointer bg-green-600 text-white rounded-md px-3 py-2">
              Ajouter
            </button>
            <span>Catégories existantes</span>
            <PopinTasks />
          </div>
        </>
      )}
      <div className="flex gap-4 bg-white rounded-xl w-full py-5 px-5 shadow-md">
        <div className="flex flex-col gap-4 w-full">
          <div className="xl:flex gap-4 justify-between">
            <input
              type="text"
              placeholder="Titre de la tâche..."
              className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
              autoFocus
            />
          </div>
          <div className="flex justify-between">
            <span>Sous-tâches</span>
            <button className="cursor-pointer bg-green-600 text-white px-2 py-0.5 text-center rounded-md">
              + Ajouter
            </button>
          </div>
        </div>
        <div className="flex flex-col  gap-4">
          <div className="flex gap-2">
            <select className="border-1 border-gray-300 rounded-md px-3 py-2">
              <option value="Personnel">Personnel</option>
            </select>
            <button className="cursor-pointer" onClick={() => buttonToggle()}>
              ⚙️
            </button>
          </div>
          <button className="flex justify-center items-center cursor-pointer bg-blue-600 text-white px-10 rounded-md h-full">
            Créer
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTasks;
