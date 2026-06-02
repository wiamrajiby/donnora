import { useRouter } from "next/router";

export default function DonorCard({ donneur }) {
  const router = useRouter();

  function goToDetail() {
    router.push("/donneurs/" + donneur.id);
  }

  function stopClick(e) {
    e.stopPropagation();
  }

  const dispoLabel = donneur.disponible
    ? "Disponible"
    : "Indisponible";

  const dispoClass = donneur.disponible
    ? "text-sm font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700"
    : "text-sm font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-500";

  return (
    <div onClick={goToDetail} className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg border-l-4 border-red-500">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">{donneur.nom}</h3>
        <span className="text-2xl font-black text-red-600">{donneur.groupe_sanguin}</span>
      </div>
      <p className="text-gray-500 text-sm">📍 {donneur.ville}</p>
      <p className="text-gray-500 text-sm">📞 {donneur.telephone}</p>
      <div className="flex items-center justify-between mt-3">
        <span className={dispoClass}>{dispoLabel}</span>
        <a href={"tel:" + donneur.telephone} onClick={stopClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Appeler</a>
      </div>
    </div>
  );
}