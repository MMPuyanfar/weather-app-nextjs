export function getWeekDay(dateObj: Date) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[dateObj.getDay()];
}

export function getDayOfMonth(dateObj: Date) {
  if (dateObj.getDate() < 10) {
    return "0" + dateObj.getDate();
  }
  return dateObj.getDate();
}

export function getMonthNumber(dateObj: Date) {
  if (dateObj.getMonth() < 9) {
    return "0" + (dateObj.getMonth() + 1);
  }
  return dateObj.getMonth() + 1;
}

export function getLocalHour(dateUTCString: string, timeZoneOffset: number) {
  let localHour =
  (new Date(dateUTCString)).getHours() +
    timeZoneOffset / 3600;
  if (localHour >= 24) {
    localHour -= 24;
  }
  if (localHour < 12) {return `${Math.floor(localHour)}:${(localHour%1)*60} AM`} 
  else if (localHour < 13) {return `${Math.floor(localHour)}:${(localHour%1)*60} PM`}
  else {return `${Math.floor(localHour)-12}:${(localHour%1)*60} PM`}
}

export function getDayOrNightIcon(iconName:string, dateUTCString: string, timeZoneOffset: number):string {
  let localHour =
  (new Date(dateUTCString)).getHours() +
    timeZoneOffset / 3600;
  if (localHour >= 24) {
    localHour -= 24;
  }
  if (localHour > 6 && localHour < 18) {return (iconName.slice(0,-1) + 'd')}
  else {return (iconName.slice(0,-1) + 'n')}
}