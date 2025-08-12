import { Home, Trash } from "lucide-react";

const PopinTasks = () => {
  return (
    <div className="flex justify-between bg-gray-100 px-1 py-2 rounded-md">
      <div className="flex gap-2">
        <Home />
        Personnel
      </div>
      <div>
        <Trash className="cursor-pointer" />
      </div>
    </div>
  );
};

export default PopinTasks;
