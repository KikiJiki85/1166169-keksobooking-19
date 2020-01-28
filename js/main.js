'use strict';

// Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

// Функция перемешивания массива
var getShuffledArray = function (arr) {
  var j = 0;
  var temp = 0;
  for (var i = arr.length - 1; i > 0; i--) {
    j = getRandomNumber(0, i);
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

var pinTemplate = document.querySelector('#pin').content;

// Строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д.
var avatarPhotoNumberArr = ['01', '02', '03', '04', '05', '06', '07', '08'];

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

// Функция генерации моки (массива объектов тестовых данных)
var createObjectsArray = function () {
  var objectsArray = [];
  var rndAvatarArr = getShuffledArray(avatarPhotoNumberArr);
  for (var i = 0; i < 8; i++) {
    var pinObject = {
      author: {
        avatar: 'img/avatars/user' + rndAvatarArr[i] + '.png'
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

// Функция подготовки шаблона и вставки меток
var renderPins = function (array) {
  var pinTemplateObject = pinTemplate.querySelector('.map__pin');

  for (var i = 0; i < array.length; i++) {
    var newPin = pinTemplateObject.cloneNode(true);
    newPin.style.left = (array[i].location.x - 25) + 'px';
    newPin.style.top = (array[i].location.y - 70) + 'px';
    newPin.querySelector('img').src = array[i].author.avatar;
    newPin.querySelector('img').alt = array[i].offer.title;
    document.querySelector('.map__pins').appendChild(newPin);
  }
};

// Это временное решение, этот класс переключает карту из неактивного состояния в активное.
document.querySelector('.map--faded').classList.remove('map--faded');
var someTestArr = createObjectsArray();
renderPins(someTestArr);

