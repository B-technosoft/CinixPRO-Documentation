export const timeToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':');
  const isPM = timeStr.includes('PM');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return isPM ? totalMinutes + 12 * 60 : totalMinutes;
};
