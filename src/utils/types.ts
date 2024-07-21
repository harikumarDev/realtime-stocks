export type MongoConnection = {
  isConnected?: Number;
};

export type Stock = {
  symbol: string;
  price: Number;
  change: Number;
  timestamp: Date;
  pChange: Number;
  high: Number;
  low: Number;
  open: Number;
  pClose: Number;
};

export interface StockState {
  selectedStock: string;
  stockData: Record<string, Stock[]>;
}

export interface StockTableProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalProps {
  showModal?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
