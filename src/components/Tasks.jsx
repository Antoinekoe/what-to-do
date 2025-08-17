import { Trash } from "lucide-react";
import Subtasks from "./Subtasks";

const Tasks = ({
  tasks,
  deleteTask,
  toggleTaskChecked,
  toggleSubtaskChecked,
}) => {
  return tasks.map((task, index) => {
    return (
      task.isDeleted === false && (
        <div
          key={index}
          className="flex gap-4 justify-between border-1 border-gray-300 px-4 py-5 ml-5 rounded-md"
        >
          <div className="flex gap-4 justify-start items-start">
            <input
              type="checkbox"
              checked={task.isChecked || false}
              onChange={() => toggleTaskChecked(index)}
              className="mt-2.5 accent-blue-600 scale-150"
            />
            <div className="flex flex-col justify-start items-start">
              {task.category}
              <span
                className={`font-semibold text-xl ${
                  task.isChecked ? "line-through" : ""
                }`}
              >
                {task.task}
              </span>
              <Subtasks
                subtasks={task.subtasks}
                taskIndex={index}
                toggleSubtaskChecked={toggleSubtaskChecked}
              />
            </div>
          </div>
          <Trash className="cursor-pointer" onClick={() => deleteTask(index)} />
        </div>
      )
    );
  });
};

export default Tasks;
