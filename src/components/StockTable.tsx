"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/store";
import { setStockData } from "@/store/stockSlice";
import { formatDate, stockNames } from "@/utils/helpers";
import { StockTableProps } from "@/utils/types";

function StockTable({ setShowModal }: StockTableProps) {
  const dispatch = useAppDispatch();
  const { selectedStock, stockData } = useAppSelector((state) => state.stock);

  const fetchData = async () => {
    const { data } = await axios.get("/api/fetchStocks");

    dispatch(setStockData(data));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => clearInterval(intervalId);
  }, []);

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
              <button
                className="text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md transition-all duration-200 rounded-md text-sm px-2 py-1.5 focus:outline-none flex items-center"
                onClick={() => setShowModal(true)}
              >
                Change Stock
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <table className="border-collapse">
          <thead className="text-base">
            <tr>
              <th>S. No.</th>
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
                <td>{index + 1}</td>
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
