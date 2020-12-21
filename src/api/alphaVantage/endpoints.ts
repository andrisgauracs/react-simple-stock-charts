export const getStockQuery = () => "https://www.alphavantage.co/query";

export enum functionType {
  TIME_SERIES_INTRADAY_EXTENDED = "TIME_SERIES_INTRADAY_EXTENDED",
  TIME_SERIES_MONTHLY = "TIME_SERIES_MONTHLY",
  TIME_SERIES_WEEKLY = "TIME_SERIES_WEEKLY",
}
