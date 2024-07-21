"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReduxProvider from "@/store/reduxProvider";
import Modal from "@/components/Modal";

const StockTable = dynamic(() => import("@/components/StockTable"), {
  ssr: false,
});

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ReduxProvider>
      <StockTable setShowModal={setShowModal} />

      {showModal && <Modal setShowModal={setShowModal} />}
    </ReduxProvider>
  );
}
