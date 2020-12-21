import Axios from "axios";
import Papa from "papaparse";
import { functionType, getStockQuery } from "../../api/alphaVantage";
import { getStockQuote } from "../../api/financialModelingPrep";
import {
  ALPHA_VANTAGE_API_KEY,
  FINANCIAL_MODELING_PREP_API_KEY,
  usingFakeData,
} from "../../config";
import demoSymbols from "../../demoData/demoSymbols.json";
import ChartData from "../../models/ChartData";
import SymbolDataDto from "../../models/SymbolDataDto";
import { DisplayTimePeriod } from "../../models/TimePeriod";
import demoData, { DemoType } from "../../demoData/demoData";

const callFunction: Record<DisplayTimePeriod, functionType> = {
  [DisplayTimePeriod.DAY]: functionType.TIME_SERIES_INTRADAY_EXTENDED,
  [DisplayTimePeriod.WEEK]: functionType.TIME_SERIES_INTRADAY_EXTENDED,
  [DisplayTimePeriod.MONTH]: functionType.TIME_SERIES_INTRADAY_EXTENDED,
  [DisplayTimePeriod.ONE_YEAR]: functionType.TIME_SERIES_WEEKLY,
  [DisplayTimePeriod.FIVE_YEARS]: functionType.TIME_SERIES_MONTHLY,
  [DisplayTimePeriod.MAX]: functionType.TIME_SERIES_MONTHLY,
};

const parseCsvResults = (results: Papa.ParseResult<any[]>): any[] => {
  let parsedData: any[] = [];
  // Remove first row, because it contains the csv header info and filter out empty data rows
  const csvData = results.data
    .slice(1)
    .filter((e) => e[0].length > 0 && !isNaN(e[4]));
  if (csvData.length > 1) {
    parsedData = csvData
      ? csvData.map(
          (row): ChartData => {
            return {
              date: row[0],
              open: parseFloat(row[1]),
              high: parseFloat(row[2]),
              low: parseFloat(row[3]),
              close: parseFloat(row[4]),
              volume: parseFloat(row[5]),
            };
          }
        )
      : [];
  }
  return parsedData;
};

async function fetchCsv(url: string) {
  return fetch(url).then(function (response) {
    let reader = response.body && response.body.getReader();
    let decoder = new TextDecoder("utf-8");

    return (
      reader &&
      reader.read().then(function (result) {
        return decoder.decode(result.value);
      })
    );
  });
}

export async function getStockDataBySymbol(
  symbol: string,
  time: DisplayTimePeriod
): Promise<ChartData[]> {
  let parsedData: ChartData[] | undefined;
  const currentFunctionType = callFunction[time];

  const basicCallParams = {
    function: currentFunctionType,
    symbol,
    datatype: "csv",
    apikey: ALPHA_VANTAGE_API_KEY,
  };

  const intradayParams =
    currentFunctionType === functionType.TIME_SERIES_INTRADAY_EXTENDED
      ? {
          interval: "15min",
          slice: "year1month1",
        }
      : {};

  const callParams = { ...basicCallParams, ...intradayParams };

  try {
    let rawCsv;
    if (!usingFakeData) {
      rawCsv = await Axios.get(getStockQuery(), {
        params: callParams,
      });
    } else {
      const localCsvData = await fetchCsv(
        demoData[symbol as DemoType][currentFunctionType].default
      );
      rawCsv = {
        data: localCsvData,
      };
    }
    Papa.parse<any[]>(rawCsv.data, {
      download: false,
      delimiter: ",",
      complete: (results) => {
        parsedData = parseCsvResults(results);
      },
    });
    return parsedData && parsedData?.length > 0 ? parsedData.reverse() : [];
  } catch (error) {
    console.warn("Error retrieving stock data", error);
    return [];
  }
}

export async function getStockSymbol(
  query: string
): Promise<SymbolDataDto[] | undefined> {
  try {
    if (!usingFakeData) {
      const { data } = await Axios.get(getStockQuote(), {
        params: {
          query,
          limit: "10",
          exchange: "NASDAQ",
          apikey: FINANCIAL_MODELING_PREP_API_KEY,
        },
      });
      return data;
    } else {
      return demoSymbols;
    }
  } catch (error) {
    console.warn("Error retrieving stock symbol", error);
    return undefined;
  }
}
