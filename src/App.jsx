import AddTasks from "./components/AddTasks";
import MyTasks from "./components/MyTasks";
import TasksCount from "./components/TasksCount";
import TasksManager from "./components/TasksManager";

function App() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-3/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">TO-DO LIST 📝</h1>
      <AddTasks />
      <TasksCount />
      <MyTasks />
      <TasksManager />
    </div>
  );
}

export default App;
