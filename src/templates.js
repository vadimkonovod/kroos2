function statusMsg(event) {
  return '*Date:* ' + dateMsg(event.date) + '\n' +
  '*Quantity:* ' + event.users.length + '\n' +
  '*Price per man:* ' + pricePerManMsg(event) + '\n' +
  '*Squad:* ' + participantsMsg(event);
}

function dateMsg(date) {
  const [weekDay, month, day] = date.toDateString().split(' ');
  const time = date.toTimeString().slice(0, 5);

  return `${weekDay}, ${day} ${month} at ${time}`;
}

function pricePerManMsg(event) {
  const hasUsers = event.users.length > 0;
  const pricePerUser = hasUsers ? event.pricePerUser().toFixed(2) + ` BYN` : 'n/a';

  return pricePerUser;
}

function participantsMsg(event) {
  if (event.users.length === 0) return '';

  const names = event.users.map(user => getConcatenatedFullName(user));

  return names.join(', ');
}

function getConcatenatedFullName(user) {
  if (user.last_name)
    return user.first_name.slice(0, 1) + '. ' + user.last_name;
  else
    return user.first_name;
}

exports.statusMsg = statusMsg;
