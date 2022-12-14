import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];


const getRandomNumber = (number) =>
  Math.floor(Math.random() * number);

const humanizePointDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';


export {getRandomArrayElement, getRandomNumber, humanizePointDueDate};

