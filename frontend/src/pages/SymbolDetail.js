import React from "react";
import { useParams, Link } from "react-router-dom";

function SymbolDetail() {
  const { symbol } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sembol Detayı</h1>
      <p className="text-lg">
        Seçilen Sembol: <span className="font-bold">{symbol}</span>
      </p>
      <Link
        to="/"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
      >
        Geri Dön
      </Link>
    </div>
  );
}

export default SymbolDetail;
