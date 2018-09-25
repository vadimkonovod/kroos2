function incrementDate(datetime) {
  datetime.setDate(datetime.getDate() + 1);

  return datetime;
}

function getNextDate(day, hours, minutes) {
  if (!Number.isInteger(day) || !(0 <= day <= 7)) {
    return null;
  }

  const date = incrementDate(new Date());

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);

  while (date.getDay() !== day) {
    incrementDate(date);
  }

  return date;
}

exports.getNextDate = getNextDate;
