import React from "react";
import { ModalProps } from "@/utils/types";
import { STOCKS } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSelectedStock } from "@/store/stockSlice";

function Modal(props: ModalProps) {
  const { setShowModal } = props;

  const dispatch = useAppDispatch();
  const { selectedStock } = useAppSelector((state) => state.stock);

  const handleChange = (stock: string) => {
    if (stock === selectedStock) return;

    dispatch(setSelectedStock(stock));
    setShowModal(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 min-w-64 max-w-96 bg-white shadow-lg border border-gray-300 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 rounded-lg z-50">
      <div className="">
        <div className="flex justify-center items-center">
          <h3 className="p-2 font-medium">Change Stock</h3>
          <div
            className="absolute cursor-pointer text-lg px-1.5 right-1 top-1 hover:bg-gray-100 rounded-full"
            onClick={() => setShowModal(false)}
            role="button"
            tabIndex={0}
          >
            &#x2715;
          </div>
        </div>

        <div className="mx-4 flex flex-col gap-2.5 mb-4">
          {STOCKS.map((stock) => (
            <button
              key={stock.symbol}
              className={`border flex justify-between rounded-md px-2 py-1 shadow-sm transition-all border-gray-200 duration-150 w-64 ${
                selectedStock === stock.symbol
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleChange(stock.symbol)}
            >
              <p>{stock.name}</p>
              <p className="text-gray-500">{stock.symbol}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
