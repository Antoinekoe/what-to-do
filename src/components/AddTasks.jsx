const AddTasks = () => {
  return (
    <div className="flex gap-4 bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Titre de la tâche..."
          className="border-1 border-gray-300"
        />
        <div className="flex justify-between">
          <span>Sous-tâches</span>
          <button className="cursor-pointer bg-green-600 text-white px-1 py-0.5 text-center rounded-md">
            + Ajouter
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1">
          <select className="border-1 border-gray-300">
            <option value="Personnel">Personnel</option>
          </select>
          <button>⚙️</button>
        </div>
        <button className="cursor-pointer bg-blue-600 text-white px-1 py-0.5 text-center h-full rounded-md">
          + Ajouter
        </button>
      </div>
    </div>
  );
};

export default AddTasks;
