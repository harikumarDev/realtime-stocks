import { NextResponse } from "next/server";
import axios from "axios";
import { STOCKS } from "@/utils/helper";
import db from "@/utils/db";
import Stock from "@/models/stock";

const API_KEY = process.env.FINNHUB_APIKEY;

export async function GET() {
  try {
    const responses = await Promise.all(
      STOCKS.map((stock) =>
        axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
        )
      )
    );

    const stocksData = responses.map((response, i) => {
      const data = response.data;
      return {
        symbol: STOCKS[i].symbol,
        price: parseFloat(data["c"]),
        timestamp: new Date().toISOString(),
        change: parseFloat(data["d"]),
        pChange: parseFloat(data["dp"]),
        high: parseFloat(data["h"]),
        low: parseFloat(data["l"]),
        open: parseFloat(data["o"]),
        pClose: parseFloat(data["pc"]),
      };
    });

    // Store the response in DB
    await db.connect();

    Stock.insertMany(stocksData);

    return NextResponse.json(stocksData);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching stock data" },
      { status: 500 }
    );
  }
}
