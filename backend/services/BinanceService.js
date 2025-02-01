import { Spot } from "@binance/connector";
import WebSocket from "ws";

class BinanceService {
  constructor() {
    this.client = new Spot();
    this.ws = null;
    this.symbols = [];
  }

  async getSymbols() {
    try {
      if (this.symbols.length === 0) {
        const response = await this.client.exchangeInfo();

        this.symbols = response.data.symbols
          .map((symbol) => symbol.symbol)
          .slice(0, 100);
      }

      return this.symbols;
    } catch (error) {
      console.error("Semboller alınırken hata oluştu:", error);
      throw error;
    }
  }

  async createWebSocketStream(callback) {
    try {
      const symbols = await this.getSymbols();

      const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`);

      this.ws = new WebSocket("wss://stream.binance.com:9443/ws");

      this.ws.onopen = () => {
        this.ws.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: streams,
            id: 1,
          })
        );
      };

      this.ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.s) {
            callback({
              symbol: data.s,
              low: data.l,
              high: data.h,
              priceChange: data.p,
              pricePercentageChange: data.P,
            });
          }
        } catch (error) {
          console.error("WebSocket mesajı işlenirken hata oluştu:", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket hatası:", error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket bağlantısı kapatıldı.");
      };

      return this.ws;
    } catch (error) {
      console.error("Websocket connection oluşturulurken bir hata oluştu.");
      throw error;
    }
  }

  closeWebSocket() {
    if (this.ws) {
      this.ws.close();
      console.log("WebSocket bağlantısı manuel olarak kapatıldı.");
    }
  }
}

export default BinanceService;
