'use strict';

// Функция выбора случайного числа
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content;

// Строка с одним из четырёх фиксированных значений:
var offerType = ['palace', 'flat', 'house', 'bungalo'];

// Словарь
var housingTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckin = ['12:00', '13:00', '14:00'];

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckout = ['12:00', '13:00', '14:00'];

// Массив строк случайной длины из ниже предложенных
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Функция создания доступных удобств в карточке
var createListFeatures = function (node, featuresArr) {
  node.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < featuresArr.length; i++) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature--' + featuresArr[i]);
    node.querySelector('.popup__features').appendChild(featureElement);
  }
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

// Строка с описанием
var offerDescription = 'Offer description';

// Массив строк случайной длины, содержащий адреса фотографий
var offerPhotosArr = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Функция создания и отрисовки доступных фотографий в карточке
var createListPhotos = function (node, photosArr) {
  node.querySelector('.popup__photos').innerHTML = '';
  for (var i = 0; i < photosArr.length; i++) {
    var offerPhoto = document.createElement('img');
    offerPhoto.classList.add('popup__photo');
    offerPhoto.src = photosArr[i];
    offerPhoto.width = 45;
    offerPhoto.height = 40;
    offerPhoto.alt = 'Фотография жилья';
    node.querySelector('.popup__photos').appendChild(offerPhoto);
  }
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

// Функция подготовки шаблона Pins и вставки меток
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

// Функция подготовки шаблона карточки объявления и ее вставки на страницу
var renderCard = function (element) {
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = element.offer.title;
  newCard.querySelector('.popup__text--address').textContent = element.offer.address;
  newCard.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';

  // Отличный вариант словаря в одной строке
  newCard.querySelector('.popup__type').textContent = housingTypes[element.offer.type];

  newCard.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

  // В список .popup__features выведите все доступные удобства в объявлении.
  createListFeatures(newCard, element.offer.features);

  newCard.querySelector('.popup__description').textContent = element.offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
  createListPhotos(newCard, element.offer.photos);

  // Замена src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
  newCard.querySelector('.popup__avatar').src = element.author.avatar;

  // Вставка полученного DOM-элемента в блок .map перед блоком.map__filters-container.
  document.querySelector('.map').insertBefore(newCard, document.querySelector('.map__filters-container'));
};

// Это временное решение, этот класс переключает карту из неактивного состояния в активное.
document.querySelector('.map--faded').classList.remove('map--faded');
var someTestArr = createObjectsArray(8);
renderPins(someTestArr);
renderCard(someTestArr[0]);
