function incrementDate(datetime) {
  datetime.setDate(datetime.getDate() + 1);

  return datetime;
}

function getNextDate(day) {
  if (!Number.isInteger(day) || !(0 <= day <= 7)) {
    return null;
  }

  const date = incrementDate(new Date());

  while (date.getDay() !== day) {
    incrementDate(date);
  }

  return date;
}

function toHumanReadable(date) {
  return date.toDateString() + ' at ' + date.toTimeString().split(' ')[0];
}

exports.getNextDate = getNextDate;
exports.toHumanReadable = toHumanReadable;
