import React, { Dispatch, FC } from "react";
import { DisplayTimePeriod } from "../../models/TimePeriod";
import {
  StockChartContextActions,
  stockChartContextReducer,
  StockChartState,
} from "./StockChartReducer";

export const defaultState: StockChartState = {
  // stockInfo: { symbol: "IBM", name: "", exchange: "" },
  stockInfo: undefined,
  intraDayChartData: undefined,
  weeklyChartData: undefined,
  monthlyChartData: undefined,
  timePeriod: DisplayTimePeriod.DAY,
};

export const StockChartContext = React.createContext<StockChartState>(
  defaultState
);
const StockDispatchContext = React.createContext<
  Dispatch<StockChartContextActions> | undefined
>(undefined);

const StockChartContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    stockChartContextReducer,
    defaultState
  );

  return (
    <StockChartContext.Provider value={state}>
      <StockDispatchContext.Provider value={dispatch}>
        {children}
      </StockDispatchContext.Provider>
    </StockChartContext.Provider>
  );
};

export function useStockChartState() {
  const context = React.useContext(StockChartContext);
  if (context === undefined) {
    throw new Error(
      "useStockChartState must be used within a StockChartProvider"
    );
  }
  return context;
}
export function useStockChartDispatch() {
  const context = React.useContext(StockDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useStockChartDispatch must be used within a StockChartProvider"
    );
  }
  return context;
}

export default StockChartContextProvider;
