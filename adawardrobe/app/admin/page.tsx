"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      if (decoded.role !== "ROLE_ADMIN") {
        router.push("/unauthorized");
        return;
      }

      setAllowed(true);
    } catch (err) {
      router.push("/login");
    }
  }, []);

  if (!allowed) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Bienvenue sur la page admin, {}</h1>
    </div>
  );
}

