const MyTasks = () => {
  return (
    <div className="flex flex-col gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Mes tâches</h2>
        <select className="border-1 border-gray-300 rounded-md px-3 py-1">
          <option value="Toutes les catégories">Toutes les catégories</option>
        </select>
      </div>
    </div>
  );
};

export default MyTasks;
