import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Stock from "@/models/stock";

export async function POST(req: NextRequest) {
  await db.connect();

  try {
    const stockData = await req.json();

    await Stock.insertMany(stockData);

    return NextResponse.json({
      message: "Stock data stored successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Error storing the stock data" },
      { status: 500 }
    );
  }
}
