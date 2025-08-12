const AddTasks = () => {
  return (
    <div className="flex gap-4 bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 justify-between">
          <input
            type="text"
            placeholder="Titre de la tâche..."
            className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
            autoFocus
          />
          <button className="flex justify-center items-center cursor-pointer bg-blue-600 text-white px-10 rounded-md flex-shrink-0">
            + Ajouter
          </button>
        </div>
        <div className="flex justify-between">
          <span>Sous-tâches</span>
          <button className="cursor-pointer bg-green-600 text-white px-2 py-0.5 text-center rounded-md">
            + Ajouter
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1">
          <select className="border-1 border-gray-300 rounded-md px-3 py-2">
            <option value="Personnel">Personnel</option>
          </select>
          <button className="cursor-pointer">⚙️</button>
        </div>
      </div>
    </div>
  );
};

export default AddTasks;
