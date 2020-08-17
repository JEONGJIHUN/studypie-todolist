export function getDay(day: number): string {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "";
  }
}

export function yearMonthDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  return `${year}.${month}.${date}`;
}

export function moveDate(d: Date, forward: boolean) {
  const oneDay = new Date(d);
  oneDay.setDate(d.getDate() + (forward ? 1 : -1));
  const twoDay = new Date(d);
  twoDay.setDate(d.getDate() + (forward ? 2 : -2));
  const now = new Date(d);
  return {
    now: oneDay,
    after: forward ? twoDay : now,
    before: forward ? now : twoDay,
  };
}
