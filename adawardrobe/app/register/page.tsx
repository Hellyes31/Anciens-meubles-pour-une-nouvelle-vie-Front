"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    const userForm = {
      firstname,
      lastname,
      username,
      mail,
      city,
      password,
    };

  
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        userForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFirstname("");
      setLastname("");
      setUsername("");
      setMail("");
      setCity("");
      setPassword("");
      setConfirmPassword("");

      if (
        window.confirm(
          "Votre compte a été créé avec succès ! Cliquez sur OK pour vous connecter."
        )
      ) {
        router.push("/login");
      }
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
          <h2 className="card-header">Création de compte</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <label htmlFor="">Prénom</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Nom</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Mail</label>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Ville</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
            <div>
              <label htmlFor="">Confirmation du mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              <span>Créer mon compte</span>
            </button>
            <button
              type="button"
              className="submit-btn manage-btn"
              onClick={() => router.push("/login")}
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
