import WebSocket from "ws";
import fetch from "node-fetch";

const serverUrl = "http://localhost:3000";
const numberOfConnections = 100;

async function getSymbols() {
  const response = await axi(`${serverUrl}/symbols`);
  const symbols = await response.json();
  return symbols;
}

async function main() {
  const symbols = await getSymbols();
  const connections = [];

  for (let i = 0; i < numberOfConnections; i++) {
    const symbol = symbols[i % symbols.length];
    const ws = new WebSocket(`ws://localhost:3000/${symbol.toLowerCase()}`);

    ws.onopen = () => {
      console.log(`WebSocket connection opened for ${symbol}`);
    };

    ws.onmessage = (event) => {
      console.log(`Received data for ${symbol}:`, JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error);
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for ${symbol}`);
    };

    connections.push(ws);
  }

  // Testi bir süre çalıştırın ve sonra bağlantıları kapatın
  setTimeout(() => {
    connections.forEach((ws) => ws.close());
  }, 60000); // 60 saniye sonra bağlantıları kapat
}

main();
