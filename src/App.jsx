import AddTasks from "./components/AddTasks";
import MyTasks from "./components/MyTasks";
import TasksCount from "./components/TasksCount";
import TasksCategoryManager from "./components/TasksCategoryManager";

function App() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center max-w-3/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">TO-DO LIST 📝</h1>
      <AddTasks />
      <TasksCount />
      <div className="flex flex-col gap-4 justify-between bg-white rounded-xl w-full py-5 px-5 shadow-md">
        <MyTasks />
        <TasksCategoryManager />
      </div>
    </div>
  );
}

export default App;
