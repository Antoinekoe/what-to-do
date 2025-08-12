import { Trash } from "lucide-react";
import Subtasks from "./Subtasks";

const Tasks = () => {
  return (
    <div className="flex gap-4 justify-between border-1 border-gray-300 px-4 py-5 ml-5 rounded-md">
      <div className="flex gap-4 justify-start items-start">
        <input type="checkbox" className="mt-1.5 accent-blue-600 scale-150" />
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Name of the task</span>
          <Subtasks />
        </div>
      </div>
      <Trash />
    </div>
  );
};

export default Tasks;
