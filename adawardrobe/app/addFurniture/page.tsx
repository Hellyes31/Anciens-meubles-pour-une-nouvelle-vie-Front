"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Color {
  id: number;
  color: string;
}

interface Type {
  id: number;
  type: string;
}

export default function PostFurniture() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  const [colorList, setColorList] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | "new">("");
  const [newColor, setNewColor] = useState("");

  const [typeList, setTypeList] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string | "new">("");
  const [newType, setNewType] = useState("");

  const [error, setError] = useState("");

  const statusId = 5;

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [colors, types] = await Promise.all([
          axios.get("http://localhost:8080/api/color", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:8080/api/type", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setColorList(colors.data);
        setTypeList(types.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des options.");
      }
    };
    loadOptions();
  }, []);

  const uploadToImageKit = async (file: File): Promise<string> => {
    // Étape 1: récupérer token/signature/expire
    const auth = await axios.get(
      "http://localhost:8080/api/imagekit/generate-auth-params"
    );

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
    form.append("signature", auth.data.signature);
    form.append("expire", auth.data.expire);
    form.append("token", auth.data.token);

    // Étape 2: upload direct ImageKit
    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/files/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    if (!uploadRes.ok) {
      throw new Error("Upload ImageKit échoué");
    }

    const result = await uploadRes.json();
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let colorId: number | null = null;
    let typeId: number | null = null;

    try {
      if (selectedColor === "new") {
        const existingColor = colorList.find(
          (c) => c.color.toLowerCase() === newColor.toLowerCase()
        );
        if (existingColor) {
          colorId = existingColor.id;
        } else {
          const res = await axios.post("http://localhost:8080/api/color", {
            name: newColor,
          });
          colorId = res.data.id;
          setColorList((prev) => [...prev, res.data]);
        }
      } else {
        colorId = parseInt(selectedColor);
      }

      if (selectedType === "new") {
        const existingType = typeList.find(
          (t) => t.type.toLowerCase() === newType.toLowerCase()
        );
        if (existingType) {
          typeId = existingType.id;
        } else {
          const res = await axios.post("http://localhost:8080/api/type", {
            name: newType,
          });
          typeId = res.data.id;
          setTypeList((prev) => [...prev, res.data]);
        }
      } else {
        typeId = parseInt(selectedType);
      }
    } catch (err: any) {
      console.error("Erreur complète :", JSON.stringify(err, null, 2));
      setError(
        err.response?.data ||
          "Erreur lors de la création de la couleur ou du type"
      );
    }

    let photoUrl = "";
    if (photo) {
      try {
        photoUrl = await uploadToImageKit(photo);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de l'upload de la photo");
        return;
      }
    }
    const furnitureData = {
      title,
      description,
      price: parseFloat(price),
      color: { id: colorId },
      photo: { photo: photoUrl },
      status: { id: statusId },
      type: { id: typeId },
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/furniture",
        furnitureData
      );
      setTitle("");
      setDescription("");
      setPrice("");
      setPhoto(null);
      setSelectedColor("");
      setNewColor("");
      setSelectedType("");
      setNewType("");
      setError("");
      alert("Meuble ajouté avec succès !");
    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de l’envoi du meuble.");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Anciens meubles, nouvelle vie</h1>
        </div>
        <p className="header-subtitle">
          Donnez une seconde chance à vos meubles ♻️
        </p>
      </header>
      <div className="main-content">
        <div className="card">
          <h2 className="card-header">Ajouter votre meuble</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <label htmlFor="">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <input
              type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="">Prix</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                required
              >
                <option value="">Sélectionner une couleur</option>
                {colorList.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.color}
                  </option>
                ))}
                <option value="new">Nouvelle couleur</option>
              </select>
              {selectedColor === "new" && (
                <input
                  type="text"
                  placeholder="Nouvelle couleur"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                />
              )}
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
              >
                <option value="">Sélectionner un type</option>
                {typeList.map((t) => (
                  <option key={t.id} value={t.id.toString()}>
                    {t.type}
                  </option>
                ))}
                <option value="new">Nouveau type</option>
              </select>
              {selectedType === "new" && (
                <input
                  type="text"
                  placeholder="Nouveau type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                />
              )}
            </div>
            <div>
              <label htmlFor="">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                required
              />
            </div>
            <div>
              <p>Votre meuble sera mis en ligne une fois qu'un admin l'aura accepté, cela prendra 24h maximum. Merci.</p>
            </div>
            <button type="submit" className="submit-btn">
              <span>Ajouter le meuble</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
