import { CircularProgress } from "@material-ui/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usingFakeData } from "../../config";
import { sleep } from "../../demoData/demoData";
import ChartData from "../../models/ChartData";
import { DisplayTimePeriod } from "../../models/TimePeriod";
import { getStockDataBySymbol } from "../../service/StockService/StockService";
import {
  useStockChartDispatch,
  useStockChartState,
} from "../context/StockChartContext";
import { Types } from "../context/StockChartReducer";
import StockChart from "../StockChart/StockChart";
import StockTimePeriodToggler from "../StockTimePeriodToggler/StockTimePeriodToggler";

const StockLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 720px;
  width: 100%;
  padding: 3rem;
  position: relative;
  .MuiCircularProgress-colorPrimary {
    color: #ababab;
  }
  .MuiCircularProgress-root {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 200px;
    margin: auto;
  }
`;

const NoResultsFound = styled.div`
  position: absolute;
  text-align: center;
  color: #ababab;
  left: 0;
  right: 0;
  top: 200px;
  margin: auto;
`;

const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const StockInfo = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  .symbol {
    font-size: 38px;
  }
  .additionalInfo {
    font-size: 12px;
    margin-left: 12px;
    line-height: 16px;
    color: #ababab;
  }
`;

/**
 * If we are using fake data, the charts will display
 * with a status as of December 20, 2020
 **/
const referenceDate = usingFakeData
  ? dayjs(new Date(2020, 11, 20)).toDate()
  : dayjs().toDate();

const today = referenceDate;
const week = dayjs(referenceDate).subtract(7, "day").toDate();
const month = dayjs(referenceDate).subtract(30, "day").toDate();
const year = dayjs(referenceDate).subtract(1, "year").toDate();
const five_years = dayjs(referenceDate).subtract(5, "year").toDate();

const Stock = () => {
  const {
    timePeriod,
    stockInfo,
    intraDayChartData,
    weeklyChartData,
    monthlyChartData,
  } = useStockChartState();
  const dispatch = useStockChartDispatch();
  const symbol = stockInfo?.symbol ?? undefined;
  const [loading, setLoading] = useState(false);

  const currenChartSettings: Record<
    DisplayTimePeriod,
    { chartData: ChartData[] | undefined; targetDate?: Date }
  > = React.useMemo(
    () => ({
      [DisplayTimePeriod.DAY]: {
        chartData: intraDayChartData,
        targetDate: today,
      },
      [DisplayTimePeriod.WEEK]: {
        chartData: intraDayChartData,
        targetDate: week,
      },
      [DisplayTimePeriod.MONTH]: {
        chartData: intraDayChartData,
        targetDate: month,
      },
      [DisplayTimePeriod.ONE_YEAR]: {
        chartData: weeklyChartData,
        targetDate: year,
      },
      [DisplayTimePeriod.FIVE_YEARS]: {
        chartData: monthlyChartData,
        targetDate: five_years,
      },
      [DisplayTimePeriod.MAX]: {
        chartData: monthlyChartData,
        targetDate: undefined,
      },
    }),
    [intraDayChartData, monthlyChartData, weeklyChartData]
  );
  const currentSettings = currenChartSettings[timePeriod];

  useEffect(() => {
    async function getStockData(symbol: string) {
      setLoading(true);
      const stockData = await getStockDataBySymbol(symbol, timePeriod);
      if (usingFakeData) {
        await sleep(1000);
      }
      let typeForDispatch = Types.SetIntraDayChartData;

      if (timePeriod === DisplayTimePeriod.ONE_YEAR) {
        typeForDispatch = Types.SetWeeklyChartData;
      } else if (
        timePeriod === DisplayTimePeriod.FIVE_YEARS ||
        timePeriod === DisplayTimePeriod.MAX
      ) {
        typeForDispatch = Types.SetMonthlyChartData;
      }

      dispatch({
        type: typeForDispatch,
        payload: stockData,
      });
      setLoading(false);
    }
    if (currenChartSettings[timePeriod].chartData || loading) {
      return;
    }
    symbol && getStockData(symbol);
  }, [
    symbol,
    monthlyChartData,
    weeklyChartData,
    intraDayChartData,
    loading,
    dispatch,
    timePeriod,
    currenChartSettings,
  ]);

  const trimData = (data: ChartData[]) => {
    if (timePeriod === DisplayTimePeriod.DAY) {
      return data.filter(
        (e) =>
          new Date(e.date).getDate() ===
          new Date(data[data.length - 1].date).getDate()
      );
    }
    return data.filter((e) =>
      currentSettings.targetDate !== undefined
        ? new Date(e.date) > currentSettings.targetDate
        : true
    );
  };
  return symbol ? (
    <StockLayout>
      <>
        <StockHeader>
          <StockInfo>
            <div className="symbol">{symbol}</div>
            <div className="additionalInfo">
              <div className="fullName">{stockInfo?.name}</div>
              <div className="metaInfo">{`${stockInfo?.exchange} | ${stockInfo?.currency}`}</div>
            </div>
          </StockInfo>
          <StockTimePeriodToggler />
        </StockHeader>
        {loading ? (
          <CircularProgress color="primary" />
        ) : !currentSettings.chartData ||
          currentSettings.chartData.length === 0 ? (
          <NoResultsFound>No results found.</NoResultsFound>
        ) : (
          <StockChart
            stockChart={trimData(currentSettings.chartData) || []}
            timeFrame={timePeriod}
          />
        )}
      </>
    </StockLayout>
  ) : null;
};

export default Stock;
