const Subtasks = ({ tasks }) => {
  // Add safety check - if tasks is undefined or not an array, show empty state
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-light">0/0 sous-tâches terminées</span>
        <ul className="border-l-gray-400 border-l-2 ml-5 px-5">
          <li className="text-gray-400 italic">Aucune sous-tâche</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-light">0/{tasks.length} sous-tâches terminées</span>
      <ul className="border-l-gray-400 border-l-2 ml-5 px-5">
        {tasks.map((subtask, index) => (
          <li key={index} className="flex gap-2">
            <input type="checkbox" />
            {subtask}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subtasks;
