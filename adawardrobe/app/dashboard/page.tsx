"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Dashboard() {
  // États pour les meubles
  const [furnitures, setFurnitures] = useState<any[]>([]); // "any" pour éviter interface
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurnitures = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/furniture",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFurnitures(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des meubles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFurnitures();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard des Meubles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {furnitures.map((furniture, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-4 flex flex-col"
          >
            {furniture.photos?.[0]?.photo && (
              <img
                src={furniture.photos[0].photo}
                alt={furniture.title ?? "Meuble"}
                style={{
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
            )}
            <h2 className="text-xl font-semibold mb-2">
              {furniture.title ?? ""}
            </h2>
            <p className="text-gray-600 mb-2">{furniture.description ?? ""}</p>
            <p className="text-green-600 font-bold mb-2">
              {furniture.price ?? ""} €
            </p>
            <p className="text-sm text-gray-400">
              {furniture.type?.type ?? ""} | {furniture.color?.color ?? ""}
            </p>
            <p className="text-sm text-gray-400">
              Status: {furniture.status?.status ?? ""}
            </p>
            <p className="text-sm text-gray-400">
              Créé le: {furniture.created_at ?? ""}
            </p>
            <p className="text-sm text-gray-400">
              Mis à jour le: {furniture.updated_at ?? ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
