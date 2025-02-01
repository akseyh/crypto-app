import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { createWebSocket } from "../api";

function SymbolCard({ symbol }) {
  const [realTimeData, setRealTimeData] = useState(null);
  const [ws, setWs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRealTimeDataClick = useCallback(() => {
    if (!ws) {
      const newWs = createWebSocket(
        symbol,
        (data) => {
          setRealTimeData(data);
          setLoading(false);
          setError(null);
        },
        (error) => {
          setError(error);
          setLoading(false);
        },
        () => {
          setWs(null);
          setRealTimeData(null);
          setLoading(false);
        }
      );
      setWs(newWs);
    } else {
      ws.close();
    }
  }, [ws, symbol]);

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <div
      className={`bg-gray-100 p-4 rounded shadow-md flex flex-col justify-between ${
        ws ? "flex-grow" : ""
      }`}
    >
      <span className="text-lg font-semibold">{symbol}</span>

      {error ? (
        <div className="text-red-500 mt-2">{error}</div>
      ) : realTimeData ? (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div>
            <p className="font-semibold">Yüksek</p>
            <p className="text-sm">{realTimeData.high}</p>
          </div>
          <div>
            <p className="font-semibold">Düşük</p>
            <p className="text-sm">{realTimeData.low}</p>
          </div>
          <div>
            <p className="font-semibold">Değişim</p>
            <p className="text-sm">{realTimeData.priceChange}</p>
          </div>
          <div>
            <p className="font-semibold">Değişim Oranı</p>
            <p className="text-sm">{realTimeData.pricePercentageChange}%</p>
          </div>
        </div>
      ) : null}
      {loading && <LoadingSpinner />}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleRealTimeDataClick}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 text-center ${
            ws ? "bg-red-500 hover:bg-red-700" : ""
          }`}
        >
          {ws ? "Anlık Veriyi Kapat" : "Anlık Veri"}
        </button>
        <Link
          to={`/${symbol}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 text-center"
        >
          Detay
        </Link>
      </div>
    </div>
  );
}

export default SymbolCard;
