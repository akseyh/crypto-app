import WebSocket from "ws";
import express from "express";
import cors from "cors";
import http from "http";
import BinanceService from "./services/BinanceService.js";
import dotenv from "dotenv";
import cacheMiddleware from "./middlewares/cacheMiddleware.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const binanceService = new BinanceService();

const wss = new WebSocket.Server({ server });
const subscriptions = {};

wss.on("connection", async (ws, req) => {
  const requestedSymbol = req.url.split("/").pop();

  const symbols = await binanceService.getSymbols();

  const hasRequestedSymbol = symbols
    .map((symbol) => symbol.toLowerCase())
    .includes(requestedSymbol.toLowerCase());

  if (!hasRequestedSymbol) ws.close();

  if (!subscriptions[requestedSymbol.toLowerCase()]) {
    subscriptions[requestedSymbol.toLowerCase()] = [];
  }

  subscriptions[requestedSymbol.toLowerCase()].push(ws);

  console.log(`Bir connection bağlantısı kuruldu: ${requestedSymbol}`);

  ws.on("close", () => {
    subscriptions[requestedSymbol.toLowerCase()] = subscriptions[
      requestedSymbol.toLowerCase()
    ].filter((socket) => socket !== ws);
  });
});

binanceService.createWebSocketStream(
  ({ symbol, high, low, priceChange, pricePercentageChange }) => {
    (subscriptions[symbol.toLowerCase()] || []).map((conn) => {
      conn.send(
        JSON.stringify({
          symbol,
          high,
          low,
          priceChange,
          pricePercentageChange,
        })
      );
    });
  }
);

app.get("/symbols", cacheMiddleware(60 * 5), async (req, res) => {
  try {
    const symbols = await binanceService.getSymbols();
    res.json(symbols);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Semboller alınırken bir hata oluştu",
      message: error.message,
    });
  }
});

server.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
