import { makeStyles } from "@material-ui/core/styles";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { DisplayTimePeriod } from "../../models/TimePeriod";
import {
  useStockChartDispatch,
  useStockChartState,
} from "../context/StockChartContext";
import { Types } from "../context/StockChartReducer";
import MaterialThemeProvider from "../MaterialThemeProvider/MaterialThemeProvider";

const useStyles = makeStyles(() => ({
  root: {
    height: 34,
    padding: "6px 12px",
    marginRight: "38px",
  },
}));

const StockTimePeriodToggler = () => {
  const { timePeriod } = useStockChartState();
  const classes = useStyles();
  const dispatch = useStockChartDispatch();
  const changeTimePeriod = (newTimePeriod: DisplayTimePeriod) =>
    dispatch({ type: Types.SetTimePeriod, payload: newTimePeriod });
  return (
    <MaterialThemeProvider>
      <ToggleButtonGroup
        className={classes.root}
        value={timePeriod}
        exclusive
        onChange={(_event, value) => changeTimePeriod(value)}
      >
        {Object.values(DisplayTimePeriod).map((timePeriod, i) => (
          <ToggleButton key={i} value={timePeriod}>
            {timePeriod}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </MaterialThemeProvider>
  );
};

export default StockTimePeriodToggler;
