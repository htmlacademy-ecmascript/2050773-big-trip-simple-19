// import {getRandomArrayElement, getRandomNumber} from '../utils.js';
// import {nanoid} from 'nanoid';
// import {PHOTO_LINK} from '../const.js';


// const OFFERS = [
//   {
//     id: 5,
//     title: 'Upgrade to a business class',
//     price: 120
//   }
//   ,
//   {
//     id: 6,
//     title: 'Turn on the radio',
//     price: 12
//   },
//   {
//     id: 7,
//     title: 'Help with luggage',
//     price: 90
//   }
//   ,
//   {
//     id: 8,
//     title: 'Smoking inside the cabin',
//     price: 100000
//   },
//   {
//     id: 9,
//     title: 'Earplugs and sleeping mask',
//     price: 300
//   }
// ];

// const DESTINATIONS = [
//   {
//     id: 9,
//     description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Chamonix',
//     pictures: [
//       {
//         src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         description: 'Chamonix parliament building'
//       }
//     ]
//   },
//   {
//     id: 10,
//     description: 'Istanbul, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Istanbul',
//     pictures: [
//       {
//         src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         description: 'Istanbul parliament building'
//       }
//     ]
//   },
//   {
//     id: 11,
//     description: 'Buenos-Aires, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Buenos-Aires',
//     pictures: [
//       {
//         src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         description: 'Buenos-Aires parliament building'
//       }
//     ]
//   },
//   {
//     id: 12,
//     description: 'New York, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'New York',
//     pictures: [
//       {
//         src: `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         description: 'New York parliament building'
//       }
//     ]
//   },
//   {
//     id: 13,
//     description: 'Paris, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Paris',
//     pictures: [
//       {
//         src: `${PHOTO_LINK}${getRandomNumber(100)}`,
//         description: 'Paris parliament building'
//       }
//     ]
//   },
//   {
//     id: 14,
//     description: 'Berlin, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Berlin',
//     pictures: [
//       {
//         'src': `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         'description': 'Berlin parliament building'
//       }
//     ]
//   },
//   {
//     id: 15,
//     description: 'Tbilisi, is a beautiful city, a true asian pearl, with crowded streets.',
//     name: 'Tbilisi',
//     pictures: [
//       {
//         'src': `${PHOTO_LINK}${getRandomNumber(1000)}`,
//         'description': 'Tbilisi parliament building'
//       }
//     ]
//   }
// ];

// const MOCK_POINTS = [
//   {
//     basePrice: 50,
//     dueDate: '2019-07-10',
//     dateFrom: '2019-07-10T12:55:56.845Z',
//     dateTo: '2019-07-11T11:22:13.375Z',
//     destination: 9,
//     offersId: [5, 8, 9],
//     type: 'Bus'
//   }
// ];

// function getRandomPoint() {
//   return {
//     id: nanoid(),
//     ...getRandomArrayElement(MOCK_POINTS)
//   };
// }

// const getRandomDestination = () => getRandomArrayElement(DESTINATIONS);
// const getRandomOffers = () => getRandomArrayElement(OFFERS);

// export {getRandomPoint, getRandomDestination, getRandomOffers,DESTINATIONS, OFFERS};
