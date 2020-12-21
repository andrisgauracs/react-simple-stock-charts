enum DataTimePeriod {
  INTRADAY = "Time Series (5min)",
  DAILY = "Time Series (Daily)",
  WEEKLY = "Weekly Time Series",
  MONTHLY = "Monthly Time Series",
}

enum DisplayTimePeriod {
  DAY = "1D",
  WEEK = "1W",
  MONTH = "1M",
  ONE_YEAR = "1Y",
  FIVE_YEARS = "5Y",
  MAX = "MAX",
}

export { DataTimePeriod, DisplayTimePeriod };
