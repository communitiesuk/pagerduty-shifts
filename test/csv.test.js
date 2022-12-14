const generateCsv = require('../src/csv');

describe('generateCsv()', () => {
  it('should return a string containing headers on the first line', () => {
    // Given
    const totals = {
      Alice: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
    };

    // When
    const csv = generateCsv(totals);

    // Then
    expect(csv).toEqual(expect.stringMatching(/^User,Weekday Shifts,Weekend Shifts,Total Shifts(\n|$)/));
  });

  it('should put counts for different users on different lines', () => {
    // Given
    const totals = {
      Alice: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Bob: { weekdayShifts: 4, weekendShifts: 5, totalShifts: 9 },
      Charlie: { weekdayShifts: 6, weekendShifts: 7, totalShifts: 13 },
    };

    // When
    const csv = generateCsv(totals);

    // Then
    expect(csv).toEqual(expect.stringMatching(/\nAlice,1,2,3(\n|$)/));
    expect(csv).toEqual(expect.stringMatching(/\nBob,4,5,9(\n|$)/));
    expect(csv).toEqual(expect.stringMatching(/\nCharlie,6,7,13(\n|$)/));
  });

  it('should sort CSV rows alphabetically', () => {
    // Given
    const totals = {
      Charlie: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Alice: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Bob: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Dave: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
    };

    // When
    const csv = generateCsv(totals);

    // Then
    expect(csv).toEqual(expect.stringMatching(/Alice(.|\n)*Bob(.|\n)*Charlie(.|\n)*Dave/));
  });

  it('should add the date range to the bottom of the CSV', () => {
    // Given
    const totals = {
      Charlie: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Alice: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Bob: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
      Dave: { weekdayShifts: 1, weekendShifts: 2, totalShifts: 3 },
    };

    // When
    const csv = generateCsv(totals, '2022-02-01', '2022-02-10');

    // Then
    expect(csv).toEqual(expect.stringMatching(/Range: 2022-02-01 to 2022-02-10/));
  });
});
