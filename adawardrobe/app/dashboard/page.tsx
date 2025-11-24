"use client"; // obligatoire pour un composant client avec useState

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
        const response = await axios.get("http://localhost:8080/api/furnitures");
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
            {furniture.photo?.url && (
              <Image
                src={furniture.photo.url}
                alt={furniture.title ?? "Meuble"}
                width={300}
                height={200}
                className="object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{furniture.title ?? ""}</h2>
            <p className="text-gray-600 mb-2">{furniture.description ?? ""}</p>
            <p className="text-green-600 font-bold mb-2">
              {furniture.price ?? ""} €
            </p>
            <p className="text-sm text-gray-400">
              {furniture.type?.name ?? ""} | {furniture.color?.name ?? ""}
            </p>
            <p className="text-sm text-gray-400">
              Status: {furniture.status?.name ?? ""}
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

