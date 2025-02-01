import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SymbolsList() {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await axios.get("http://localhost:8000/symbols");
        setSymbols(response.data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };

    fetchSymbols();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kripto Para Pariteleri</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {symbols.map((symbol) => (
          <div
            key={symbol}
            className="bg-gray-100 p-4 rounded shadow-md flex flex-col justify-between"
          >
            <span className="text-lg font-semibold">{symbol}</span>
            <Link
              to={`/${symbol}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 text-center"
            >
              Detay
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SymbolsList;
