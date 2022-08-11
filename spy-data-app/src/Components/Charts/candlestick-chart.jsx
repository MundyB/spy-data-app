//Using ApexCharts - see https://apexcharts.com/docs/chart-types/candlestick/ for details/docs.

import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";

const CandlestickChart = (props) => {
  function formatDate(date) {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
  }

  const [state, setState] = useState({
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: false,
        },
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (props.data.length < 1) {
      return;
    }
    //create chart format data
    const chartData = props.data.map((d) => {
      let p = new Date();
      p.toISOString();
      return { x: formatDate(d.date), y: [d.open, d.high, d.low, d.close] };
    });
    setState({ ...state, series: [{ data: chartData }] });
  }, [props.data]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {state.series[0].data.length > 0 && (
            <Chart
              options={state.plotOptions}
              series={state.series}
              type="candlestick"
              height="500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
