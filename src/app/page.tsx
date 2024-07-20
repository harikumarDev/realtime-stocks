"use client";

import React from "react";
import dynamic from "next/dynamic";
import ReduxProvider from "@/store/reduxProvider";

const StockTable = dynamic(() => import("@/components/StockTable"), {
  ssr: false,
});

export default function Home() {
  return (
    <ReduxProvider>
      <div className="p-4 px-24">
        <h1 className="text-2xl">Realtime Stock Data</h1>
        <StockTable />
      </div>
    </ReduxProvider>
  );
}
