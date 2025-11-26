"use client";

import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";

  if (hideNavbar) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/dashboard" className="navbar-link">
          <span>Les meubles</span>
        </a>
        <a href="/addFurniture" className="navbar-link">
          <span>Ajouter un meuble</span>
        </a>
        <a href="/profil" className="navbar-link">
          <span>Profil</span>
        </a>
        <a href="/logout" className="navbar-link">
          <span>Déconnexion</span>
        </a>
      </div>
    </nav>
  );
}
