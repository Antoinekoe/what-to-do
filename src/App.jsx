import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import MyTasks from "./components/MyTasks";
import TasksCount from "./components/TasksCount";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask, subtasks, category) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        task: newTask,
        subtasks: subtasks.map((subtask) => ({
          text: subtask,
          isChecked: false,
        })),
        category: category,
        isDeleted: false,
        isChecked: false,
      },
    ]);
  };

  const deleteTask = (indexOfTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) =>
        index === indexOfTask
          ? { ...task, isDeleted: true, isChecked: false }
          : task
      );
      return updatedTasks;
    });
  };

  const toggleTaskChecked = (taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) =>
        index === taskIndex ? { ...task, isChecked: !task.isChecked } : task
      );

      console.log(updatedTasks);
      const updatedSubTasks = updatedTasks.map((task) => {
        if (task.subtasks.length > 0) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) => ({
              ...subtask,
              isChecked: !subtask.isChecked,
            })),
          };
        }
        return task;
      });

      return updatedSubTasks;
    });
  };

  const toggleSubtaskChecked = (taskIndex, subtaskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) => {
        if (index === taskIndex) {
          const updatedSubtasks = task.subtasks.map((subtask, subIndex) =>
            subIndex === subtaskIndex
              ? { ...subtask, isChecked: !subtask.isChecked }
              : subtask
          );
          const allSubtasksChecked = updatedSubtasks.every(
            (subtask) => subtask.isChecked
          );

          return {
            ...task,
            subtasks: updatedSubtasks,
            isChecked: allSubtasksChecked,
          };
        }
        return task;
      })
    );
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-4/5 xl:max-w-4/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">TO-DO LIST 📝</h1>
      <AddTasks addTask={addTask} />
      <TasksCount tasks={tasks} />
      <div className="flex flex-col gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
        <MyTasks
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskChecked={toggleTaskChecked}
          toggleSubtaskChecked={toggleSubtaskChecked}
        />
      </div>
    </div>
  );
}

export default App;
