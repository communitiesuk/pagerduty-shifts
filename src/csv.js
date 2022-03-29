function generateCsv(totals, from, until) {
  const records = Object.keys(totals).map((user) => [
    user,
    totals[user].weekdayShifts,
    totals[user].weekendShifts,
    totals[user].totalShifts,
  ].join(','));

  const output = records.sort((a, b) => a[0].localeCompare(b[0]));
  output.unshift('User,Weekday Shifts,Weekend Shifts,Total Shifts');

  let result = output.join('\n');

  result += (`\n\nRange: ${from} to ${until}\n`);

  return result;
}

module.exports = generateCsv;
