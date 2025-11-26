"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Profil() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("id_user");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
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
      city,
      mail,
      password,
    };

    setError("");

    try {
      const res = await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        userForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFirstname("");
      setLastname("");
      setUsername("");
      setCity("");
      setMail("");
      setPassword("");
      setConfirmPassword("");

      if (
        window.confirm(
          "Votre compte a été modifié avec succès ! Cliquez sur OK pour vous connecter."
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
    <div className="main-content">
      <div className="card">
        <h2 className="card-header">Mon profil</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Prénom</label>
            <input
              placeholder="Votre prénom"
              value={firstname}
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Ville</label>
            <input
              type="text"
              placeholder="Votre ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="text"
              placeholder="Votre mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Confirmation du mot de passe</label>
            <input
              type="password"
              placeholder="Confirmation de votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            {" "}
            Mise à jour
          </button>
          <button
            type="button"
            className="submit-btn logout-btn"
            onClick={() => router.push("/login")}
          >
            Déconnexion
          </button>
        </form>
      </div>
    </div>
  );
}
