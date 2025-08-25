import { useMemo } from "react";
import Tasks from "./Tasks";

const MyTasks = ({
  tasks,
  deleteTask,
  toggleTaskChecked,
  toggleSubtaskChecked,
}) => {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const t of tasks) {
      if (t?.isDeleted) continue;
      const key = t?.category || "Sans catégorie";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(t);
    }
    // Sort categories alphabetically; keep stable task order
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4 justify-between w-full">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Mes tâches</h2>
      </div>

      {grouped.length === 0 ? (
        <div className="text-gray-500">Aucune tâche</div>
      ) : (
        grouped.map(([category, list], idx) => (
          <div key={category + "-" + idx} className="flex flex-col gap-2">
            <div className="font-semibold text-lg px-1">
              {category} ({list.length})
            </div>
            <Tasks
              tasks={list}
              deleteTask={deleteTask}
              toggleTaskChecked={toggleTaskChecked}
              toggleSubtaskChecked={toggleSubtaskChecked}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MyTasks;
