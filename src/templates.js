function dateMsg(date) {
  const [weekDay, month, day] = date.toDateString().split(' ');
  const time = date.toTimeString().slice(0, 5);

  return `${weekDay}, ${day} ${month} at ${time}`;
}

function statusMsg(event) {
  const hasUsers = event.users.length > 0;

  const priceMsg = `${event.price} BYN` + (hasUsers ? `- per person ${event.pricePerUser()}` : '');
  const usersMsg = hasUsers ? `Participants ${event.users.length}` + usersMsg(event) : 'Event doesn\'t have any users';

  return dateMsg(event.date) + '\n' + priceMsg + '\n\n' + usersMsg;
}

function usersMsg(event) {
  if (event.users.length === 0) return 'Event doesn\'t have any users';

  const names = event.users.map(user => `${user.first_name} ${user.last_name}`.trim());

  return names.join('\n');
}

exports.statusMsg = statusMsg;
exports.usersMsg = usersMsg;
