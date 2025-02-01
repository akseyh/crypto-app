import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../components/LoadingSpinner";
import { createWebSocket } from "../api";

function SymbolDetail() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = createWebSocket(
      symbol,
      (data) => {
        setData(data);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setError(error);
        setLoading(false);
      },
      () => {
        setWs(null);
        setLoading(false);
      }
    );
    setWs(newWs);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws, symbol]);

  const getChangeIcon = () => {
    if (!data) return null;
    const change = parseFloat(data.priceChange);
    if (change > 0)
      return (
        <FontAwesomeIcon icon={faArrowUp} className="text-green-500 ml-1" />
      );
    if (change < 0)
      return (
        <FontAwesomeIcon icon={faArrowDown} className="text-red-500 ml-1" />
      );
    return <FontAwesomeIcon icon={faEquals} className="text-gray-500 ml-1" />;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sembol Detayı</h1>
      <p className="text-lg">
        Seçilen Sembol: <span className="font-bold">{symbol}</span>
      </p>
      {loading ? (
        <div className="flex justify-center mt-4">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4">{error}</div>
      ) : data ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Anlık Veri:</h2>
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <div className="flex items-center mb-2">
              <span className="font-semibold">Fiyat Değişimi:</span>
              <span className="ml-2">{data.priceChange}</span>
              {getChangeIcon()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Yüzde Değişim:</span>
              <span className="ml-2">{data.pricePercentageChange}%</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">En Yüksek:</span>
              <span className="ml-2">{data.high}</span>
            </div>
            <div>
              <span className="font-semibold">En Düşük:</span>
              <span className="ml-2">{data.low}</span>
            </div>
          </div>
        </div>
      ) : null}
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
