import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StockState, Stock } from "@/utils/types";

const initialState: StockState = {
  selectedStock: "AAPL",
  stockData: {},
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedStock: (state, action: PayloadAction<string>) => {
      state.selectedStock = action.payload;
    },
    setStockData: (state, action: PayloadAction<Stock[]>) => {
      const stockData = state.stockData;

      action.payload.forEach((newData) => {
        const stock = newData.symbol;

        if (!stockData[stock]) {
          // Inititalise with empty array if no existing data for a stock
          stockData[stock] = [];
        }

        // Add the latest data to the start
        stockData[stock].unshift(newData);

        // Persist only 20 records for each stock
        if (stockData[stock].length > 20) {
          stockData[stock] = stockData[stock].slice(0, 20);
        }

        // Update the state
        state.stockData = stockData;
      });
    },
  },
});

// Stock Actions and Reducer
export const { setSelectedStock, setStockData } = stockSlice.actions;
export const stockReducer = stockSlice.reducer;
