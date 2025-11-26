"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        { username: login, password: password },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token, user } = res.data;
      const id_user = user.id;
      const data = res.data;
      const role = data.user.role.role;

      if (role === "ROLE_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("id_user", id_user.toString());
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Une erreur est survenue");
      }
    }
  };
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="card">
          <h2 className="card-header">Connexion</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <label htmlFor="">Nom utilisateur ou email</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              <span>Se connecter</span>
            </button>
            <button
              className="submit-btn manage-btn"
              onClick={() => router.push("/register")}
            >
              Créer un compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
