import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000";
const WS_BASE_URL = process.env.WS_BASE_URL || "ws://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchSymbols = async () => {
  try {
    const response = await api.get("/symbols");
    return response.data;
  } catch (error) {
    console.error("Error fetching symbols:", error);
    throw error;
  }
};

export const createWebSocket = (symbol, onMessage, onError, onClose) => {
  const ws = new WebSocket(`${WS_BASE_URL}/${symbol}`);

  ws.onmessage = (event) => {
    try {
      onMessage(JSON.parse(event.data));
    } catch (error) {
      console.error("Veri ayrıştırma hatası:", error);
      onError("Veri ayrıştırma hatası oluştu.");
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket hatası:", error);
    onError("WebSocket bağlantı hatası oluştu.");
  };

  ws.onclose = () => {
    onClose();
  };

  return ws;
};
