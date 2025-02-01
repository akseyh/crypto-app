# Crypto App

This is the cryptocurrency application that provides real-time price updates via WebSockets.

## How to Run

### Docker

This application can also be run using Docker. Here are the steps to build and run the application using Docker:

#### Prerequisites

- Docker installed on your machine. You can download it from [docker.com](https://www.docker.com/get-started).

#### Running the Docker Container

1.  Run the Docker container:
    ```bash
    docker compose up -d
    ```
    This will start both the frontend and backend applications inside the Docker container. The frontend will be accessible at `http://localhost:3000` and the backend at `http://localhost:8000` by default.

### Backend Application

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
    This will start the server on `http://localhost:8000`.

#### How to Test

1.  **Run the test script:**
    ```bash
    npm run test
    ```
    This script will create multiple WebSocket connections to the server and log the received data.

#### Project Structure

- `index.js`: Main file for the backend server.
- `services/BinanceService.js`: Handles communication with the Binance API.
- `test.js`: Test script for the WebSocket connections.
- `package.json`: Lists the project's dependencies and scripts.

#### Dependencies

- `@binance/connector`: For connecting to the Binance API.
- `cors`: For handling Cross-Origin Resource Sharing.
- `express`: For creating the server.
- `node-fetch`: For making HTTP requests.
- `ws`: For creating WebSocket connections.
- `nodemon`: For automatically restarting the server when changes are made.

#### API Endpoints

- `GET /symbols`: Returns a list of available trading symbols.
- `ws://localhost:3000/:symbol`: WebSocket endpoint for real-time price updates for a specific symbol.

### Frontend Application

The frontend is a React app that shows the crypto prices.

#### How to Run

1.  **Go to the frontend folder:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend:**
    ```bash
    npm start
    ```
    This will open the app in your browser at `http://localhost:3000`.

#### Project Structure

- `src/`: Contains all the React code.
  - `components/`: Reusable React components.
  - `pages/`: React pages for different views.

#### Dependencies

- `react`: For building the user interface.
- `react-router-dom`: For navigation between pages.
- `axios`: For making HTTP requests.
- `tailwindcss`: For styling the app.
- `@fortawesome/react-fontawesome`: For icons.

## Notes

- The server uses the Binance API to get real-time price data.
- The WebSocket connections are managed using the `ws` library.
- The test script creates multiple connections to simulate real-world usage.
