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

  const names = event.users.map(user => `${user.first_name} ${user.last_name}`.trim());

  return names.join('\n');
}

exports.statusMsg = statusMsg;
