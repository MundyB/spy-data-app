import { useEffect, useState } from "react";
import CandlestickChart from "../Charts/candlestick-chart";
import { init, getDataForSelectedTime } from "./spy-data-viewer-logic";
import { timeFrames, defaultTimeFrame } from "./spy-data-viewer-constants";
import "./spy-data-viewer.css";

export const SpyDataViewer = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(defaultTimeFrame);

  const initialiseComponent = async () => {
    let [data, filteredData] = await init(defaultTimeFrame);
    setData(data);
    setFilteredData(filteredData);
  };

  useEffect(() => {
    initialiseComponent();
  }, []);

  const onSelectedTimeFrameChange = (selectedTime) => {
    if (!filteredData[selectedTime]) {
      //we haven't previously selected this timeframe - data not cached.
      const selectedTimeFrameData = getDataForSelectedTime(selectedTime, data);

      setFilteredData({
        ...filteredData,
        [selectedTime]: selectedTimeFrameData,
      });
    }

    setSelectedTimeFrame(selectedTime);
  };

  return (
    <div>
      <h1>SPY Data Viewer</h1>
      {data.length > 0 && (
        <div>
          <CandlestickChart
            data={filteredData[selectedTimeFrame]}
          ></CandlestickChart>
          <div className="timeframe-select">
            <label>Select timeframe:</label>
            <select
              selected={selectedTimeFrame}
              onChange={(e) => onSelectedTimeFrameChange(e.target.value)}
            >
              {timeFrames.map((tf) => {
                return <option key={tf}>{tf}</option>;
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
