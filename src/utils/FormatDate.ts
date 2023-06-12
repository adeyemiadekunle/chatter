export const FormattedDate = (date: string) => {
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.toLocaleString('default', { day: 'numeric' });
    const year = dateObject.toLocaleString('default', { year: 'numeric' });
    return `${month} ${day}, ${year}`;
  };