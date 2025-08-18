import { useEffect, useState } from "react";

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const res = await fetch("/api/categories", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setCategories(data.categories || []);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      load();
    }
  };

  const remove = async (id) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) load();
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl w-full py-5 px-5 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Catégories</h2>
      </div>
      <form onSubmit={add} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nouvelle catégorie"
          className="border-1 border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <button className="cursor-pointer bg-green-600 text-white px-3 rounded-md">
          Ajouter
        </button>
      </form>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <ul className="list-disc ml-6">
        {categories.map((c) => (
          <li key={c.id} className="flex justify-between items-center">
            <span>{c.name}</span>
            <button
              onClick={() => remove(c.id)}
              className="cursor-pointer bg-red-600 text-white px-2 py-0.5 rounded-md"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManager;
