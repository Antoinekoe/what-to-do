import { Trash } from "lucide-react";

const Tasks = () => {
  return (
    <div className="flex">
      <input type="checkbox" />
      <span>Name of the task</span>
      <Trash />
    </div>
  );
};

export default Tasks;
