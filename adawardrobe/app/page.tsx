"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
      <div className="app-container flex flex-col">


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

        
      </div>
  );
}
