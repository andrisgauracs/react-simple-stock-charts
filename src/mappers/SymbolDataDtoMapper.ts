import StockInfo from "../models/StockInfo";
import SymbolDataDto from "../models/SymbolDataDto";

export const mapSymbolDataToStockInfo = (data: SymbolDataDto): StockInfo => ({
  exchange: data.exchangeShortName,
  name: data.name,
  symbol: data.symbol,
  currency: data.currency ?? undefined,
});
