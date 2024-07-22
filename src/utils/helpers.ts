export const STOCKS = [
  {
    name: "Apple Inc",
    symbol: "AAPL",
  },
  {
    name: "Alphabet Inc",
    symbol: "GOOG",
  },
  {
    name: "Microsoft Corp",
    symbol: "MSFT",
  },
  {
    name: "Amazon.com Inc",
    symbol: "AMZN",
  },
  {
    name: "Meta Platforms Inc",
    symbol: "META",
  },
];

export const stockNames: any = {
  AAPL: "Apple Inc",
  GOOG: "Alphabet Inc",
  MSFT: "Microsoft Corp",
  AMZN: "Amazon.com Inc",
  META: "Meta Platforms Inc",
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const d = date.getDate().toFixed().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${d}/${month}, ${hours}:${minutes}:${seconds}`;
};
