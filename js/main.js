'use strict';

// Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

// Функция создания случайного массива чисел от 1 до 8 для адресов изображений
var getRandomNumArray = function () {
  var rndArray = [];
  while (rndArray.length < 8) {
    var rndNumber = getRandomNumber(1, 8);
    if (rndArray.indexOf(rndNumber) === -1) {
      rndArray.push(rndNumber);
    }
  }
  return rndArray;
};

// Строка с одним из четырёх фиксированных значений:
var offerType = ['palace', 'flat', 'house', 'bungalo'];

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckin = ['12:00', '13:00', '14:00'];

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckout = ['12:00', '13:00', '14:00'];

// Массив строк случайной длины из ниже предложенных
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Строка с описанием
var offerDescription = 'Offer description';

// Массив строк случайной длины, содержащий адреса фотографий
var offerPhotosArr = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var createObjectsArray = function () {
  var objectsArray = [];
  var rndNumberArray = getRandomNumArray();
  for (var i = 0; i < 8; i++) {
    var pinObject = {
      author: {
        avatar: 'img/avatars/user0' + rndNumberArray[i] + '.png'
      },
      offer: {
        title: 'OfferTitle',
        address: getRandomNumber(550, 600) + ', ' + getRandomNumber(300, 350),
        price: getRandomNumber(100, 1000),
        type: offerType[getRandomNumber(0, offerType.length - 1)],
        rooms: getRandomNumber(1, 3),
        guests: getRandomNumber(1, 5),
        checkin: offerCheckin[getRandomNumber(0, offerCheckin.length - 1)],
        checkout: offerCheckout[getRandomNumber(0, offerCheckout.length - 1)],
        features: offerFeatures[getRandomNumber(0, offerFeatures.length - 1)],
        description: offerDescription,
        photos: offerPhotosArr[getRandomNumber(0, offerPhotosArr.length - 1)],
      },
      location: {
        x: getRandomNumber(100, 200),
        y: getRandomNumber(130, 630)
      }
    };
    objectsArray[i] = pinObject;
  }
  return objectsArray;
};


// Это временное решение, этот класс переключает карту из неактивного состояния в активное.
document.querySelector('.map--faded').classList.remove('map--faded');
createObjectsArray();
