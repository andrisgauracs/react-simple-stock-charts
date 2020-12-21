const demoData = {
  AMZN: {
    TIME_SERIES_INTRADAY_EXTENDED: require("./AMZN/intraday.csv"),
    TIME_SERIES_WEEKLY: require("./AMZN/weekly.csv"),
    TIME_SERIES_MONTHLY: require("./AMZN/monthly.csv"),
  },
  AAPL: {
    TIME_SERIES_INTRADAY_EXTENDED: require("./AAPL/intraday.csv"),
    TIME_SERIES_WEEKLY: require("./AAPL/weekly.csv"),
    TIME_SERIES_MONTHLY: require("./AAPL/monthly.csv"),
  },
  FB: {
    TIME_SERIES_INTRADAY_EXTENDED: require("./FB/intraday.csv"),
    TIME_SERIES_WEEKLY: require("./FB/weekly.csv"),
    TIME_SERIES_MONTHLY: require("./FB/monthly.csv"),
  },
  MSFT: {
    TIME_SERIES_INTRADAY_EXTENDED: require("./MSFT/intraday.csv"),
    TIME_SERIES_WEEKLY: require("./MSFT/weekly.csv"),
    TIME_SERIES_MONTHLY: require("./MSFT/monthly.csv"),
  },
  TSLA: {
    TIME_SERIES_INTRADAY_EXTENDED: require("./TSLA/intraday.csv"),
    TIME_SERIES_WEEKLY: require("./TSLA/weekly.csv"),
    TIME_SERIES_MONTHLY: require("./TSLA/monthly.csv"),
  },
};

export type DemoType = "AMZN" | "AAPL" | "TSLA" | "FB" | "MSFT";

// To fake request loading time
export function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default demoData;
