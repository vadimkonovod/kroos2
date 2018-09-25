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

  while (date.getDay() !== day) {
    incrementDate(date);
  }

  return date;
}

function toHumanReadable(date) {
  const [weekDay, month, day] = date.toDateString().split(' ');
  const [time] = date.toTimeString().split(' ');

  return `${weekDay}, ${day} ${month} at ${time}`;
}

exports.getNextDate = getNextDate;
exports.toHumanReadable = toHumanReadable;
