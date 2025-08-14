import { useState } from "react";
import AddTasks from "./components/AddTasks";
import MyTasks from "./components/MyTasks";
import TasksCount from "./components/TasksCount";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask, subtasks, category) => {
    console.log(tasks);
    setTasks((prevTasks) => [
      ...prevTasks,
      { task: newTask, subtasks: subtasks, category: category },
    ]);
  };

  const deleteTask = (indexOfTask) => {
    const newTasks = tasks.filter((_, index) => index !== indexOfTask);
    setTasks(newTasks);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-4/5 xl:max-w-4/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">TO-DO LIST 📝</h1>
      <AddTasks addTask={addTask} />
      <TasksCount />
      <div className="flex flex-col gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
        <MyTasks tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
