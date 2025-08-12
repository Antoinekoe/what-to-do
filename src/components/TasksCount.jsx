const TasksCount = () => {
  return (
    <div className="flex gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <span>
        Total : <span className="font-semibold">5</span>
      </span>
      <span>
        Terminées : <span className="font-semibold text-green-600">2</span>
      </span>
      <span>
        Restantes : <span className="font-semibold text-blue-800">3</span>
      </span>
    </div>
  );
};

export default TasksCount;
