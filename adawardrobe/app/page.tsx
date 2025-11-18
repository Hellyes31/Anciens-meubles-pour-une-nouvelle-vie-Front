"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
      <div className="app-container flex flex-col">
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">Anciens meubles, nouvelle vie</h1>
          </div>
          <p className="header-subtitle">
            Donnez une seconde chance à vos meubles ♻️
          </p>
        </header>

        <main className="main-content">
          <div className="card">
            <h2 className="card-header">
              Donnez, vendez ou trouvez des meubles uniques
            </h2>

            <p className="text-gray-600 mb-4 text-sm">
              Une plateforme simple pour revendre vos anciens meubles ou
              dénicher des pièces uniques prêtes à vivre une nouvelle histoire.
            </p>
            <button
              className="submit-btn"
              onClick={() => router.push("/login")}
            >
              Se connecter
            </button>
          </div>
        </main>

        <footer>© {new Date().getFullYear()} - Meubles Recyclés</footer>
      </div>
  );
}
