import { FormattedDate } from './FormatDate';

describe('FormattedDate', () => {
  it('should format the date correctly', () => {
    const inputDate = '2022-01-01';
    const expectedOutput = 'January 1, 2022';

    const formattedDate = FormattedDate(inputDate);

    expect(formattedDate).toEqual(expectedOutput);
  });
});
