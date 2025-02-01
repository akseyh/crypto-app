# Crypto App Backend

This is the cryptocurrency application that provides real-time price updates via WebSockets.

## How to Run

1.  **Install Node.js:** Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org).

2.  **Clone the repository:**

    ```bash
    git clone [repository_url]
    cd backend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```
    This will start the server on `http://localhost:3000`.

## How to Test

1.  **Run the test script:**
    ```bash
    npm run test
    ```
    This script will create multiple WebSocket connections to the server and log the received data.

## Project Structure

- `index.js`: Main file for the backend server.
- `services/BinanceService.js`: Handles communication with the Binance API.
- `test.js`: Test script for the WebSocket connections.
- `package.json`: Lists the project's dependencies and scripts.

## Dependencies

- `@binance/connector`: For connecting to the Binance API.
- `cors`: For handling Cross-Origin Resource Sharing.
- `express`: For creating the server.
- `node-fetch`: For making HTTP requests.
- `ws`: For creating WebSocket connections.
- `nodemon`: For automatically restarting the server when changes are made.

## API Endpoints

- `GET /symbols`: Returns a list of available trading symbols.
- `ws://localhost:3000/:symbol`: WebSocket endpoint for real-time price updates for a specific symbol.

## Notes

- The server uses the Binance API to get real-time price data.
- The WebSocket connections are managed using the `ws` library.
- The test script creates multiple connections to simulate real-world usage.
