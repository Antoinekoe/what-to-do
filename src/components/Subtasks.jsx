const Subtasks = ({ tasks }) => {
  console.log(tasks);
  return (
    <div className="flex flex-col gap-2">
      <span className="font-light">0/3 sous-tâches terminées</span>
      <ul className="border-l-gray-400 border-l-2 ml-5 px-5">
        {tasks.map((task, index) => (
          <li key={index} className="flex gap-2">
            <input type="checkbox" />
            {task.subTask[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subtasks;
