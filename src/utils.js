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
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() <= new Date(point.dateTo).getTime()),
};

const sortByTime = (waypointA, waypointB)=>{
  const durationA = dayjs(waypointA.dateTo).diff(dayjs(waypointA.dateFrom));
  const durationB = dayjs(waypointB.dateTo).diff(dayjs(waypointB.dateFrom));
  return durationB - durationA;
};

const sortByPrice = (waypointA, waypointB)=> waypointB.basePrice - waypointA.basePrice;


const sortByDay = (waypointA, waypointB)=>dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));

export {getRandomArrayElement, getRandomNumber, humanizePointDueDate, updateItem,
  createDestination, createDescription, filter, sortByTime, sortByPrice, sortByDay};

