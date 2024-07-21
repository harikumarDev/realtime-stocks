# Real-time Stocks
A real-time stock price tracker that fetches data from the Finnhub API and displays it in a dynamic table. The application is built using Next.js, TypeScript, and Redux.

**Live Demo:** [realtime-stocks.vercel.app](https://realtime-stocks.vercel.app)

## Features
- Fetches real-time stock data for selected stocks
- Displays the most recent 20 entries for each stock
- Allows users to switch between different stocks
- Persists data using Redux and local storage

## Run locally
Ensure you have met the following requirements:

- Node.js (v18.17.0 or later)
- npm or yarn
- MongoDB installed and running locally (or a MongoDB Atlas account)
- Finnhub API key (You can get a free API key [here](https://finnhub.io/register))

## Installation
1. Clone the repository:
```bash
git clone https://github.com/harikumarDev/realtime-stocks.git
cd realtime-stocks
```

2. Install the dependencies:
```bash
npm install
```
or
```bash
yarn install
```

3. Create a `.env.local` file in the root directory and add the following environment variables:
```bash
MONGO_URI=mongodb://localhost:27017/stocks
FINNHUB_APIKEY=finnhub_api_key
```

Replace `finnhub_api_key` with your actual Finnhub API key.

## Running the Application

1. Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`

## Usage
- The application will display a table with real-time stock data.
- Use the "Change Stock" button to switch between different stocks.
- The data is updated every 6 seconds.

## Important Notes
- The application polls data every 6 seconds to avoid exceeding the free API rate limit.
- Despite this precaution, it might still exceed the API rate limit and receive an error after few minutes.
- If you encounter rate limit errors, try loading the page after sometime.
