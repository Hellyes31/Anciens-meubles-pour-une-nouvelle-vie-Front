'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role?: string;
  exp?: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // On bloque le rendu tant que la vérification n’est pas faite

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      router.push("/unauthorized");
      return;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);
      if (decoded.role !== "ROLE_ADMIN") {
        router.push("/unauthorized");
      } else {
        setLoading(false); // Token ok, on peut afficher la page
      }
    } catch (error) {
      router.push("/unauthorized");
    }
  }, [router]);

  if (loading) {
    return <div className="app-container flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return <div>Page Admin sécurisée</div>;
}
