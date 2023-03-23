const month_number = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

export const getDate = (type = 0) => {
  //0 - today
  const today = new Date();

  today.setDate(today.getDate() + type);

  const day = `0${today.getDate()}`.slice(-2);
  const month = month_number[today.getMonth()];
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getHour = () => {
  const today = new Date();

  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  return `${hour}:${minutes}:${seconds}`;
};
