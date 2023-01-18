export const addMinutes = (d: Date, minutes: number) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + minutes);
};
