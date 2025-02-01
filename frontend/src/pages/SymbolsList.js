import React, { useState, useEffect } from "react";
import axios from "axios";
import SymbolCard from "../components/SymbolCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SymbolsList() {
  const [symbols, setSymbols] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await axios.get("http://localhost:8000/symbols");
        setSymbols(response.data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
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
