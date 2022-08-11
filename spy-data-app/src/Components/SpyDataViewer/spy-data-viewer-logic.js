//This would generally be an 'actions' file as middleware using redux-thunk.
//Contains all business logic. Would also 'dispatch' the state changes to reducer rather
//than return the changes for component to update state

//note: if not following the redux pattern, we could have written a custom hook to contain
//all of our state and business logic (simpler approach for this app). The UI component could then simply use the returned
//state from the custom hook and call the custom hooks returned functions on state change

import { dateFilter } from "./../../Common/util";
import { getSpyData } from "./../../Services/data-service";
import { daysInTimeFrame } from "./spy-data-viewer-constants";

let maxEndDate = {};

export const init = async (defaultTimeFrame) => {
  let spyData = await getSpyData();
  maxEndDate = spyData[spyData.length - 1].date; //can use Array.at(-1) with es22

  let startDate = new Date(maxEndDate);

  startDate.setDate(startDate.getDate() - daysInTimeFrame[defaultTimeFrame]);
  let copiedData = [];
  copiedData[defaultTimeFrame] = dateFilter(spyData, startDate, maxEndDate);
  return [spyData, copiedData];
};

export const getDataForSelectedTime = (selectedTime, data) => {
  let startDate = new Date(maxEndDate);
  startDate.setDate(startDate.getDate() - daysInTimeFrame[selectedTime]);

  return dateFilter(data, startDate, maxEndDate);
};
