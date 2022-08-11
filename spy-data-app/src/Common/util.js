export const dateFilter = (data, start, end) => {
  return data.filter(
    (item) =>
      item.date.getTime() >= start.getTime() &&
      item.date.getTime() <= end.getTime()
  );
};
