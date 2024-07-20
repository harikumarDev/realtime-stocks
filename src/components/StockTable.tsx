"use client";

import React, { ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/store";
import { setStockData, setSelectedStock } from "@/store/stockSlice";
import { formatDate, stockNames, STOCKS } from "@/utils/helper";

function StockTable() {
  const dispatch = useAppDispatch();
  const { selectedStock, stockData } = useAppSelector((state) => state.stock);

  const fetchData = async () => {
    const { data } = await axios.get("/api/fetchStocks");

    dispatch(setStockData(data));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedStock(e.target.value));
  };

  return (
    <div className="flex flex-col items-center w-full mt-8">
      <div>
        <div className="w-full pb-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <p className="text-3xl font-semibold">
                {stockNames[selectedStock]}
              </p>
              <p className="text-gray-500 mt-0.5">{selectedStock}</p>
            </div>
            <div>
              <select
                name="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2 outline-none"
                value={selectedStock}
                onChange={handleChange}
              >
                {STOCKS.map((stock) => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <table className="border-collapse">
          <thead className="text-base">
            <tr>
              <th>Current Price ($)</th>
              <th>Change</th>
              <th>Time</th>
              <th>Percent. Change</th>
              <th>High ($)</th>
              <th>Low ($)</th>
              <th>Open price ($)</th>
              <th>Previous Close ($)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {stockData[selectedStock]?.map((item, index) => (
              <tr key={index}>
                <td>{item.price.toString()}</td>
                <td
                  className={`${
                    +item.change > 0 ? "text-green-600" : "text-red-400"
                  }`}
                >
                  {item.change.toString()}
                </td>
                <td>{formatDate(item.timestamp.toString())}</td>
                <td
                  className={`${
                    +item.pChange > 0 ? "text-green-600" : "text-red-400"
                  }`}
                >
                  {item.pChange.toString()} %
                </td>
                <td>{item.high.toString()}</td>
                <td>{item.low.toString()}</td>
                <td>{item.open.toString()}</td>
                <td>{item.pClose.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockTable;
