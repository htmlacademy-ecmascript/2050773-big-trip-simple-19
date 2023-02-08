import dayjs from 'dayjs';
import {FilterType} from './const.js';

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

const createPictures = (id, destinations) => {
  for (let i = 0; i < destinations.length; i++) {

    if (destinations[i].id === id) {
      return destinations[i].pictures;
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

const getOffersByType = (point, pointCommon) => pointCommon.allOffers.find((offerTypes) => offerTypes.type === point.type).offers;

const calculateTotalPrice = (point, pointCommon) => {
  let price = point.basePrice;
  const offersByType = getOffersByType(point, pointCommon);

  point.selectedOffers.map((selectedOfferId) => {
    const offerPrice = offersByType.find((offer) => offer.id === selectedOfferId).price;
    price += offerPrice;
  });
  return price;
};

export {updateItem,
  createDestination, createDescription, createPictures, filter, sortByTime, sortByPrice, sortByDay, getOffersByType, calculateTotalPrice,};

