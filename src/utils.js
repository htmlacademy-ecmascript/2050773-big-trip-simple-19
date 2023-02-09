import dayjs from 'dayjs';
import {FilterType} from './const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() <= new Date(point.dateTo).getTime()),
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

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

const createPictures = (id, destinations) => {
  for (let i = 0; i < destinations.length; i++) {

    if (destinations[i].id === id) {
      return destinations[i].pictures;
    }
  }
};

const findOffersByID = (type, offers) => {

  for (let j = 0; j < offers.length; j++) {
    if (offers[j].type === type) {
      return offers[j];
    }
  }
};

const sortByTime = (waypointA, waypointB) => {
  const durationA = dayjs(waypointA.dateTo).diff(dayjs(waypointA.dateFrom));
  const durationB = dayjs(waypointB.dateTo).diff(dayjs(waypointB.dateFrom));
  return durationB - durationA;
};

const sortByPrice = (waypointA, waypointB) => waypointB.basePrice - waypointA.basePrice;


const sortByDay = (waypointA, waypointB) => dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom));


export {updateItem,
  createDestination, createDescription, createPictures, filter, sortByTime, sortByPrice, sortByDay, findOffersByID};

