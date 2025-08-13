import { X } from "lucide-react";
import { useState } from "react";
import PopinTasks from "./PopinTasks";

const AddTasks = ({ addTask }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [formData, setFormData] = useState({
    task: "",
    category: "",
    subtasks: [],
  });
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0);
  const [subtaskInputs, setSubtaskInputs] = useState([]);

  const buttonToggle = () => {
    setIsToggle(!isToggle);
  };

  const handleAddSubTask = (e) => {
    e.preventDefault();
    setNumberOfSubTasks(numberOfSubTasks + 1);
    setSubtaskInputs([...subtaskInputs, ""]);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle subtask input changes
  const handleSubtaskChange = (index, value) => {
    const newSubtaskInputs = [...subtaskInputs];
    newSubtaskInputs[index] = value;
    setSubtaskInputs(newSubtaskInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(formData.task, subtaskInputs, formData.category);
    // Here you would typically:
    // 1. Send data to your backend API
    // 2. Update your app's state
    // 3. Show success message
    // 4. Reset the form

    // Reset form after submission
    setFormData({
      task: "",
      category: "",
      subtasks: [],
    });
    setNumberOfSubTasks(0);
    setSubtaskInputs([]);
  };

  return (
    <>
      {isToggle && (
        <>
          <div className="fixed inset-0 bg-black/50 z-10"></div>

          <div className="fixed flex flex-col gap-4 w-1/5 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl py-5 px-5 shadow-md z-20">
            <div className="flex justify-between">
              <span className="font-bold text-2xl">Gérer les catégories</span>
              <button onClick={() => buttonToggle()}>
                <X className="cursor-pointer" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Entrez votre catégorie"
              className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
            />
            <button className="self-start cursor-pointer bg-green-600 text-white rounded-md px-3 py-2">
              Ajouter
            </button>
            <span>Catégories existantes</span>
            <PopinTasks />
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 bg-white rounded-xl w-full py-5 px-5 shadow-md"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="xl:flex gap-4 justify-between">
            <input
              type="text"
              name="task"
              minLength={2}
              onChange={handleInputChange}
              value={formData.task}
              placeholder="Titre de la tâche..."
              className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
              autoFocus
            />
          </div>
          <div className="flex justify-between">
            <span>Sous-tâches</span>
            <button
              onClick={handleAddSubTask}
              className="cursor-pointer bg-green-600 text-white px-2 py-0.5 text-center rounded-md"
            >
              + Ajouter
            </button>
          </div>
          {subtaskInputs.map((subtask, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Sous-tâche ${index + 1}`}
              value={subtask}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              className="border-1 border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none"
            />
          ))}
        </div>
        <div className="flex flex-col  gap-4">
          <div className="flex gap-2">
            <select
              name="category"
              onChange={handleInputChange}
              value={formData.category}
              className="border-1 border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Personnel">Personnel</option>
              <option value="Travail">Travail</option>
            </select>
            <button className="cursor-pointer" onClick={() => buttonToggle()}>
              ⚙️
            </button>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center cursor-pointer bg-blue-600 text-white px-10 rounded-md px-2 py-0.5"
          >
            Créer
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTasks;
