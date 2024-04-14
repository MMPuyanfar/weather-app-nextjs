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

// the function below get a date string and time zone offset in seconds and return the local hour in 24 format
export function getLocalHour(
  dateUTCString: string,
  timeZoneOffset: number
) {
  let localHour =
    new Date(dateUTCString).getHours() +
    timeZoneOffset / 3600;
  if (localHour >= 24) {
    localHour -= 24;
  } else if (localHour < 0) {
    localHour += 24;
  }
  if (localHour < 12) {
    const H =
      String(Math.floor(localHour)).length < 2
        ? "0" + Math.floor(localHour)
        : Math.floor(localHour);
    const M =
      String((localHour % 1) * 60).length < 2
        ? "0" + (localHour % 1) * 60
        : (localHour % 1) * 60;
    return `${H}:${M} AM`;
  } else if (localHour < 13) {
    const H = Math.floor(localHour);
    const M =
      String((localHour % 1) * 60).length < 2
        ? "0" + (localHour % 1) * 60
        : (localHour % 1) * 60;
    return `${H}:${M} PM`;
  } else {
    const H =
      String(Math.floor(localHour) - 12).length < 2
        ? "0" + (Math.floor(localHour) - 12)
        : Math.floor(localHour) - 12;
    const M =
      String((localHour % 1) * 60).length < 2
        ? "0" + (localHour % 1) * 60
        : (localHour % 1) * 60;
    return `${H}:${M} PM`;
  }
}

//the function below determine whether it is day or night in a location and returns the day icon name or night icon name for the iamge url
export function getDayOrNightIcon(
  iconName: string,
  dateUTCString: string,
  timeZoneOffset: number
): string {
  let localHour =
    new Date(dateUTCString).getHours() +
    timeZoneOffset / 3600;
  if (localHour >= 24) {
    localHour -= 24;
  }
  if (localHour > 6 && localHour < 18) {
    return iconName.slice(0, -1) + "d";
  } else {
    return iconName.slice(0, -1) + "n";
  }
}

//unfortunately the api only returns one sunrise and sunset for a location.
//in order to show an approximately sunrise and sunset for 5days forecast section, we use these functions
//if we are in winter and spring, the days are getting longer so we add 1 min for each day to sunset
// and subtract 1 min for each day from sunrise
//if the we are in summer or fall, vise versa.
export function getSunrise(
  dateString: string,
  index: number,
  sunrise: number
) {
  const month = new Date(dateString).getMonth();
  if (month === 11 || month < 5) {
    return sunrise - (index + 1) * 60;
  } else {
    return sunrise + (index + 1) * 60;
  }
}

export function getSunset(
  dateString: string,
  index: number,
  sunset: number
) {
  const month = new Date(dateString).getMonth();
  if (month === 11 || month < 5) {
    return sunset + (index + 1) * 60;
  } else {
    return sunset - (index + 1) * 60;
  }
}
