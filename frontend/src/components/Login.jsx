import { useState } from "react";

const Login = ({ onAuthenticated }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Erreur");
        return;
      }
      onAuthenticated(data.user);
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center max-w-4/5 xl:max-w-4/8 mx-auto">
      <h1 className="font-bold text-4xl py-10">Se connecter</h1>
      <form
        onSubmit={submit}
        className="flex flex-col gap-3 bg-white rounded-xl w-full max-w-md py-6 px-6 shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-1 border-gray-300 rounded-md px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-1 border-gray-300 rounded-md px-3 py-2"
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-sm text-blue-700"
        >
          {mode === "login"
            ? "Pas de compte ? Inscrivez-vous"
            : "Déjà inscrit ? Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
