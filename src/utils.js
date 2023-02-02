import dayjs from 'dayjs';
import {FilterType} from './const.js';

const DATE_FORMAT = 'D MMMM';

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];


const getRandomNumber = (number) =>
  Math.floor(Math.random() * number);

const humanizePointDueDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function isDateExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

const createDestination = (id, destinations) => {
  for (let i = 0; i < destinations.length; i++) {

    if (destinations[i].id === id) {
      return destinations[i].name;
    }
  }
};

const createDescription = (id, destinations) => {
  for (let i = 0; i < destinations.length; i++) {

    if (destinations[i].id === id) {
      return destinations[i].description;
    }
  }
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !isDateExpired(point.dueDate)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateExpired(point.dueDate)),
};


export {getRandomArrayElement, getRandomNumber, humanizePointDueDate, updateItem, createDestination, createDescription, filter};

