"use client";

import {useState} from "react";
import axios from "axios";

export default function LoginPage(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:8080/api/login", {
                username: login,
                password: password,
            });


            const user = res.data;
            console.log("Utilisateur connecté : ", user);
            // setMessage(`✅ Bienvenue ${res.data.firstname} !`);
        } catch (err:any){
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("Une erreur est survenue");
            }
        }
    };
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Nom Utilisateur ou Email</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}