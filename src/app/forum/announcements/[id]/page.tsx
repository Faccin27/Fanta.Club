'use client';

import { useParams } from 'next/navigation';

const AnnouncementDetail = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <h1 className="text-3xl font-bold">Detalhes do Anúncio {id}</h1>
    </div>
  );
};

export default AnnouncementDetail;
