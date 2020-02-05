export const convertToTime = number => {
  const reference = number + 60 * 8;
  const hour =
    Math.floor(reference / 60) <= 12
      ? Math.floor(reference / 60).toString()
      : (Math.floor(reference / 60) - 12).toString();
  const minutes =
    reference % 60
      ? (reference % 60).toString().length === 1
        ? "0" + (reference % 60).toString()
        : (reference % 60).toString()
      : "00";

  const result = `${hour}:${minutes}`;
  return result;
};
