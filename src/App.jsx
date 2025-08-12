import AddTasks from "./components/AddTasks";

function App() {
  return (
    <div className="flex flex-col justify-center items-center max-w-3/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">TO-DO LIST 📝</h1>
      <AddTasks />
    </div>
  );
}

export default App;
