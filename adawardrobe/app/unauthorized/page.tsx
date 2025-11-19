'use client';
import { useRouter } from 'next/navigation';

export default function Unauthorized() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="app-container flex items-center justify-center min-h-screen bg-gray-50">
      <div className="card max-w-md text-center">
        <div className="card-header text-2xl text-red-600">
           Accès refusé
        </div>
        <p className="mt-4 text-gray-700">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div className="mt-6">
          <button className="submit-btn" onClick={goHome}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
