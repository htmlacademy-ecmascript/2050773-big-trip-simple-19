import {getRandomArrayElement, GetRandomNumber} from '.utils.js';
import {TRAVEL_TYPES, CITIES, DESCRIPTIONS_MOCKING, PHOTO_LINK} from '../const.js';

const mockWaypoints = [
  {
    type: getRandomArrayElement(TRAVEL_TYPES),
    timeStart: [],
    timeFinish: [],
    destination: [],
    price: GetRandomNumber(100000),
    additional: []
  }
];
