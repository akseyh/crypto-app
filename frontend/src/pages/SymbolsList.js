import React, { useState, useEffect } from "react";
import SymbolCard from "../components/SymbolCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchSymbols } from "../api";

function SymbolsList() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSymbols = async () => {
      try {
        const data = await fetchSymbols();
        setSymbols(data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSymbols();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Symbols</h1>
      {loading ? (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {symbols.map((symbol) => (
            <SymbolCard key={symbol} symbol={symbol} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SymbolsList;
