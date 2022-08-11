//Data layer.
//All data calls come through this service, Allows us to easily change data fetching logic in one place.
//We would normally memoize these calls if we don't need latest data on each call.

import spyJson from "../MockData/data.json";

export const getSpyData = async () => {
  //this is where you would await fetch/axios/whatever but, in this instance we are just using canned data
  const data = spyJson.map((d) => {
    const [day, month, year] = d.date.split("/");
    const date = new Date(`${month} ${day} ${year}`);
    return {
      date: date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
    };
  });

  return data;
};
