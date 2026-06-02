export default function ResultDisplay({ groupe, confiance }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <p className="text-gray-500 text-sm mb-2">Groupe Sanguin Détecté</p>
      <div className="text-7xl font-black text-red-600 my-4">{groupe}</div>
      <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-lg font-semibold">
        Confiance : {confiance}%
      </div>
    </div>
  );
}