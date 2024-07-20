import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Stock = mongoose.models.Stock || mongoose.model("Stock", StockSchema);

export default Stock;
