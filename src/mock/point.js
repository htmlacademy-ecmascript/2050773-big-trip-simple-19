import {getRandomArrayElement, getRandomNumber} from '../utils.js';
import {PHOTO_LINK} from '../const.js';


const OFFERS = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120
  }
  ,
  {
    id: 2,
    title: 'Turn on the radio',
    price: 12
  },
  {
    id: 3,
    title: 'Help with luggage',
    price: 90
  }
  ,
  {
    id: 4,
    title: 'Smoking inside the cabin',
    price: 100000
  }
];

const DESTINATIONS = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Istanbul, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Istanbul',
    pictures: [
      {
        src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
        description: 'Istanbul parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'Buenos-Aires, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Buenos-Aires',
    pictures: [
      {
        src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
        description: 'Buenos-Aires parliament building'
      }
    ]
  },
  {
    id: 4,
    description: 'New York, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'New York',
    pictures: [
      {
        src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
        description: 'New York parliament building'
      }
    ]
  },
  {
    id: 5,
    description: 'Paris, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Paris',
    pictures: [
      {
        src: `${PHOTO_LINK}${getRandomNumber(100)}`,
        description: 'Paris parliament building'
      }
    ]
  },
  {
    id: 6,
    description: 'Berlin, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Berlin',
    pictures: [
      {
        'src': `${PHOTO_LINK}${getRandomNumber(1000)}`,
        'description': 'Berlin parliament building'
      }
    ]
  },
  {
    id: 7,
    description: 'Tbilisi, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tbilisi',
    pictures: [
      {
        'src': `${PHOTO_LINK}${getRandomNumber(1000)}`,
        'description': 'Tbilisi parliament building'
      }
    ]
  }
];

const MOCK_POINTS = [
  {
    basePrice: 50,
    dueDate: '2019-07-10',
    dateFrom: '2019-07-10T12:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'Chamonix',
    id: '1',
    offers: [1],
    type: 'Bus'
  },
  {
    basePrice: 70,
    dueDate: '2019-03-10',
    dateFrom: '2019-07-10T20:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'New York',
    id: '2',
    offers: [1],
    type: 'Train'
  },
  {
    basePrice: 100000,
    dueDate: '2019-07-1',
    dateFrom: '2019-07-10T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:59.375Z',
    destination: 'Paris',
    id: '3',
    offers: OFFERS.id,
    type: 'Ship'
  },
  {
    basePrice: 100,
    dueDate: '2019-01-1',
    dateFrom: '2019-07-10T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:59.375Z',
    destination: 'Istanbul',
    id: '4',
    offers: OFFERS.id,
    type: 'Taxi'
  },
  {
    basePrice: 900,
    dueDate: '2019-01-1',
    dateFrom: '2019-07-10T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:59.375Z',
    destination: 'Buenos-Aires',
    id: '5',
    offers: OFFERS.id,
    type: 'Restaurant'
  },
  {
    basePrice: 900,
    dueDate: '2022-11-1',
    dateFrom: '2019-07-10T21:55:56.845Z',
    dateTo: '2019-07-11T11:22:59.375Z',
    destination: 'Berlin',
    id: '6',
    offers: OFFERS.id,
    type: 'Bars'
  },
];

const getRandomPoint = () => getRandomArrayElement(MOCK_POINTS);
const getRandomDestination = () => getRandomArrayElement(DESTINATIONS);
const getRandomOffers = () => getRandomArrayElement(OFFERS);

export {getRandomPoint, getRandomDestination, getRandomOffers};
