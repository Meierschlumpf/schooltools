export const getTimeByNumber = (number: number) => {
  const hour = Math.floor(number / 60);
  const minute = number % 60;
  const hourString = hour <= 9 ? `0${hour}` : hour.toString();
  const minuteString = minute <= 9 ? `0${minute}` : minute.toString();
  return `${hourString}:${minuteString}`;
};
