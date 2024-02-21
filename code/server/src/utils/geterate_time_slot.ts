export const geterateTimeSlot = (): number[] => {
  const sequence: number[] = [];
  for (let i = 0; i < 20; i++) {
    sequence.push(30 + 5 * i);
  }
  return sequence;
};
