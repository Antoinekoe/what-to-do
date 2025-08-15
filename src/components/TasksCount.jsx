import { useEffect, useState } from "react";

const TasksCount = ({ tasks }) => {
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setTotal(() => {
      return tasks.filter((task) => task.isDeleted === false).length;
    });
    setFinished(() => {
      return tasks.filter((task) => task.isChecked).length;
    });
    setDeleted(() => {
      return tasks.filter((task) => task.isDeleted).length;
    });
    setLeft(() => {
      return total - finished;
    });
  }, [tasks, finished, total]);

  return (
    <div className="flex gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <span>
        Total : <span className="font-semibold">{total}</span>
      </span>
      <span>
        Terminées :{" "}
        <span className="font-semibold text-green-600">{finished}</span>
      </span>
      <span>
        Supprimées :{" "}
        <span className="font-semibold text-red-600">{deleted}</span>
      </span>
      <span>
        Restantes : <span className="font-semibold text-blue-800">{left}</span>
      </span>
    </div>
  );
};

export default TasksCount;
