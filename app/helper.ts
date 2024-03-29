export function getWeekDay(dateObj:Date){
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return weekdays[dateObj.getDay()]
}

export function getDayOfMonth(dateObj:Date){
  if (dateObj.getDate() < 10) {
    return ('0' + dateObj.getDate())
  }
  return dateObj.getDate()
}

export function getMonthNumber(dateObj:Date){
  if (dateObj.getMonth() < 9) {
    return ('0' + (dateObj.getMonth()+1))
  }
  return (dateObj.getMonth()+1)
}
