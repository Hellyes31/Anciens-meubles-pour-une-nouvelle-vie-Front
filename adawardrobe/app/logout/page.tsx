"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");

    router.replace("/login");
  }, [router]);

  return (
    <div className="logout-message">
      <p>Déconnexion en cours...</p>
    </div>
  );
}
