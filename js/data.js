'use strict';
(function () {

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

  // Функция выбора случайного числа
  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  };

  // Функция создание массива случайной длины
  var createRandomLengthArray = function (arr) {
    var rndArray = [];
    var rndArrayLength = getRandomNumber(1, arr.length);
    for (var i = 0; i < rndArrayLength; i++) {
      rndArray.push(arr[i]);
    }
    return rndArray;
  };

  // Функция генерации моки (массива объектов тестовых данных)
  var createObjectsArray = function (objQuantity) {
    var objectsArray = [];
    for (var i = 0; i < objQuantity; i++) {
      var pinObject = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'OfferTitle' + (i + 1),
          address: getRandomNumber(550, 600) + ', ' + getRandomNumber(300, 350),
          price: getRandomNumber(100, 1000),
          type: offerType[getRandomNumber(0, offerType.length - 1)],
          rooms: getRandomNumber(1, 3),
          guests: getRandomNumber(1, 5),
          checkin: offerCheckin[getRandomNumber(0, offerCheckin.length - 1)],
          checkout: offerCheckout[getRandomNumber(0, offerCheckout.length - 1)],
          features: createRandomLengthArray(offerFeatures),
          description: offerDescription,
          photos: createRandomLengthArray(offerPhotosArr),
        },
        location: {
          x: getRandomNumber(100, 1100),
          y: getRandomNumber(130, 630)
        }
      };
      objectsArray[i] = pinObject;
    }
    return objectsArray;
  };

  window.data = {
    createObjectsArray: createObjectsArray,
  };
})();
