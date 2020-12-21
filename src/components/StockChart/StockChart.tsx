import dayjs from "dayjs";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartData from "../../models/ChartData";
import { DisplayTimePeriod } from "../../models/TimePeriod";
import StyledChart from "../StyledChart/StyledChart";

interface Props {
  stockChart: ChartData[];
  timeFrame: DisplayTimePeriod;
}

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const StockChart: React.FC<Props> = ({ stockChart, timeFrame }) => {
  const formatter = (value: string) => {
    const dayJsValue = dayjs(value);
    if (timeFrame === DisplayTimePeriod.DAY) {
      return `${dayJsValue.format("HH:mm")}`;
    } else if (
      timeFrame === DisplayTimePeriod.WEEK ||
      timeFrame === DisplayTimePeriod.MONTH
    ) {
      return `${monthsShort[dayJsValue.month()]} ${dayJsValue.date()}`;
    }
    return value;
  };

  return (
    <StyledChart>
      <AreaChart width={720} height={350} data={stockChart} baseValue="dataMin">
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2b9640" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2b9640" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="5 5" opacity="0.2" />
        <Tooltip
          contentStyle={{
            background: "rgba(24, 24, 24, 0.95)",
            borderColor: "#111",
          }}
          labelStyle={{ color: "#d2d2d2" }}
          formatter={(value) => [value, "Close"]}
        />
        <XAxis
          dataKey="date"
          tickFormatter={formatter}
          allowDuplicatedCategory={false}
          interval={"preserveStart"}
          minTickGap={50}
          tickSize={0}
          tickMargin={15}
          height={40}
        />
        <YAxis
          tickMargin={15}
          tickSize={0}
          orientation="right"
          tickFormatter={(value) => value.toFixed(2)}
          domain={[
            (dataMin) => dataMin - dataMin * 0.1,
            (dataMax) => dataMax + dataMax * 0.1,
          ]}
        />
        <Area
          type="monotone"
          dataKey="close"
          strokeWidth="2"
          stroke="#0dba2f"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </StyledChart>
  );
};

export default StockChart;
