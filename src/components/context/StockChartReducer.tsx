import ChartData from "../../models/ChartData";
import StockInfo from "../../models/StockInfo";
import { DisplayTimePeriod } from "../../models/TimePeriod";

export interface StockChartState {
  intraDayChartData?: ChartData[];
  weeklyChartData?: ChartData[];
  monthlyChartData?: ChartData[];
  timePeriod: DisplayTimePeriod;
  stockInfo?: StockInfo;
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SetStock = "SET_STOCK",
  SetTimePeriod = "SET_TIME_PERIOD",
  SetIntraDayChartData = "SET_INTRADAY_CHART_DATA",
  SetWeeklyChartData = "SET_WEEKLY_CHART_DATA",
  SetMonthlyChartData = "SET_MONTHLY_CHART_DATA",
}

type StockChartContextPayload = {
  [Types.SetStock]: StockInfo | undefined;
  [Types.SetTimePeriod]: DisplayTimePeriod;
  [Types.SetIntraDayChartData]: ChartData[] | undefined;
  [Types.SetWeeklyChartData]: ChartData[] | undefined;
  [Types.SetMonthlyChartData]: ChartData[] | undefined;
};

export type StockChartContextActions = ActionMap<StockChartContextPayload>[keyof ActionMap<StockChartContextPayload>];

export const stockChartContextReducer = (
  state: StockChartState,
  action: StockChartContextActions
): StockChartState => {
  switch (action.type) {
    case Types.SetStock:
      return {
        ...state,
        stockInfo: action.payload || undefined,
        monthlyChartData: undefined,
        weeklyChartData: undefined,
        intraDayChartData: undefined,
        timePeriod: DisplayTimePeriod.DAY,
      };
    case Types.SetTimePeriod:
      return { ...state, timePeriod: action.payload };
    case Types.SetIntraDayChartData:
      return { ...state, intraDayChartData: action.payload };
    case Types.SetWeeklyChartData:
      return { ...state, weeklyChartData: action.payload };
    case Types.SetMonthlyChartData:
      return { ...state, monthlyChartData: action.payload };
    default:
      return state;
  }
};
