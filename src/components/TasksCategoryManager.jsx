import { useState } from "react";
import Tasks from "./Tasks";

const TasksManager = () => {
  const [categoryManager, setCategoryManager] = useState({
    Personnel: 0,
    Travail: 0,
    Santé: 0,
  });
  return (
    <>
      <span> Personnel (1) </span>
      <Tasks />
    </>
  );
};

export default TasksManager;
