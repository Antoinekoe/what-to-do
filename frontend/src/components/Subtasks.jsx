const Subtasks = ({ subtasks, taskIndex, toggleSubtaskChecked }) => {
  // Add safety check - if tasks is undefined or not an array, show empty state
  if (!subtasks || !Array.isArray(subtasks) || subtasks.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-light">0/0 sous-tâches terminées</span>
        <ul className="border-l-gray-400 border-l-2 ml-5 px-5">
          <li className="text-gray-400 italic">Aucune sous-tâche</li>
        </ul>
      </div>
    );
  }

  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isChecked
  ).length;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-light">
        {completedSubtasks}/{subtasks.length} sous-tâches terminées
      </span>
      <ul className="border-l-gray-400 border-l-2 ml-5 px-5">
        {subtasks.map((subtask, subtaskIndex) => (
          <li key={subtaskIndex} className="flex gap-2">
            <input
              type="checkbox"
              checked={subtask.isChecked || false}
              onChange={() => toggleSubtaskChecked(taskIndex, subtaskIndex)}
            />
            <span className={subtask.isChecked ? "line-through" : ""}>
              {subtask.text || subtask}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subtasks;
