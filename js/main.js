'use strict';

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LABEL_CENTER = 33;
var PIN_POINTER_X = 33;
var PIN_POINTER_Y = 84;

// Словарь соответствия изменения количества комнат и количества гостей
var ROOMS_FOR_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
var rooms = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');

// Функция установки соответствия количества комнат и количества гостей
var validateGuests = function () {
  var validGuestsOptions = ROOMS_FOR_GUESTS[rooms.value]; // Валидные опции из словаря
  var guestsOptions = guests.querySelectorAll('option'); // Находим все опции по количеству мест (гостям)
  guestsOptions.forEach(function (currentOption) { // Перебор всех доступных опций в коллекции
    currentOption.disabled = true; // Блокируем все по-умолчанию
    currentOption.selected = false; // Сбрасываем выбор selected
    var index = validGuestsOptions.indexOf(currentOption.value); // Находим в списке валидных опций нашу опцию
    if (index >= 0) {
      currentOption.disabled = false; // Разблокировка опции, если она есть в словаре
      if (index === 0) {
        currentOption.selected = true; // Первый элемент выставляем в selected
      }
    }
  });
};

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

var housingTypesMinCost = {
  'palace': '10000',
  'flat': '1000',
  'house': '5000',
  'bungalo': '0'
};

// 3.3 Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
var roomType = document.querySelector('#type');

var validateHousingTypes = function () {
  var selectedRoomTypes = roomType.querySelectorAll('option');
  selectedRoomTypes.forEach(function (currentOption) {
    if (roomType.value === currentOption.value) {
      document.querySelector('#price').min = housingTypesMinCost[currentOption.value];
      document.querySelector('#price').placeholder = '' + housingTypesMinCost[currentOption.value];
    }
  });
};

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckin = ['12:00', '13:00', '14:00'];

// Строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
var offerCheckout = ['12:00', '13:00', '14:00'];

// 3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var validateCheckOut = function () {
  timeOut.value = timeIn.value;
};

var validateCheckIn = function () {
  timeIn.value = timeOut.value;
};

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

var mapPinMain = document.querySelector('.map__pin--main');

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

// Функция скрытия-показа элементов управления формы (input, select и т. д. должны быть неактивны в исходном состоянии)
var setFormDisableAttr = function (form, field, attrStatus) {
  var inputArray = document.querySelector(form).querySelectorAll(field);
  for (var i = 0; i < inputArray.length; i++) {
    inputArray[i].disabled = attrStatus;
  }
};

// Функция установки поля ввода адреса
var setPinAdress = function (xOffset, yOffset) {
  document.querySelector('#address').value = Math.round(parseInt(mapPinMain.style.left, 10) + xOffset) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + yOffset);
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

// Создание пина
var createPin = function (pinElement) {
  var pinTemplateObject = pinTemplate.querySelector('.map__pin');
  var newPin = pinTemplateObject.cloneNode(true);
  newPin.style.left = (pinElement.location.x - 25) + 'px';
  newPin.style.top = (pinElement.location.y - 70) + 'px';
  newPin.querySelector('img').src = pinElement.author.avatar;
  newPin.querySelector('img').alt = pinElement.offer.title;
  newPin.addEventListener('click', function () {
    renderCard(pinElement);
  });
  newPin.addEventListener('keydown', pinEnterPressHandler(pinElement));
  return newPin;
};

// Функция отрисовки пина
var renderPins = function (array) {
  array.forEach(function (currentElement) {
    document.querySelector('.map__pins').appendChild(createPin(currentElement));
  });
};

// Функция закрытия(удаления) карточки
var closeCard = function () {
  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', popupEscPressHandler);
  }
};

// Добавьте поддержку открытия карточки объявления с клавиатуры. Карточка объявления для выбранной метки открывается при нажатии на клавишу Enter.
var pinEnterPressHandler = function (evt, element) {
  if (evt.key === ENTER_KEY) {
    renderCard(element);
  }
};

// Добавьте возможность закрытия карточки с подробной информацией по нажатию клавиши Esc и клике по иконке закрытия;
var popupEscPressHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closeCard();
  }
};

// Функция подготовки шаблона карточки объявления и ее вставки на страницу (метод отрисовки карточки)
var renderCard = function (cardElement) {
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = cardElement.offer.title;
  newCard.querySelector('.popup__text--address').textContent = cardElement.offer.address;
  newCard.querySelector('.popup__text--price').textContent = cardElement.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = housingTypes[cardElement.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = cardElement.offer.rooms + ' комнаты для ' + cardElement.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
  createListFeatures(newCard, cardElement.offer.features);
  newCard.querySelector('.popup__description').textContent = cardElement.offer.description;
  createListPhotos(newCard, cardElement.offer.photos);
  newCard.querySelector('.popup__avatar').src = cardElement.author.avatar;
  newCard.querySelector('.popup__close').addEventListener('click', closeCard);
  document.addEventListener('keydown', popupEscPressHandler);
  if (!document.querySelector('.map__card')) {
    document.querySelector('.map').insertBefore(newCard, document.querySelector('.map__filters-container'));
  }
};

// Установка неактивного состояния п 1.1 ТЗ
setFormDisableAttr('.ad-form', 'fieldset', true);
setFormDisableAttr('.map__filters', 'select', true);
setFormDisableAttr('.map__filters', 'fieldset', true);
setPinAdress(LABEL_CENTER, LABEL_CENTER);

// Функция перевода страницы в активное состояние п 1.2 ТЗ
var setActiveState = function () {
  if (document.querySelector('.map--faded')) {
    document.querySelector('.map--faded').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    setFormDisableAttr('.ad-form', 'fieldset', false);
    setFormDisableAttr('.map__filters', 'select', false);
    setFormDisableAttr('.map__filters', 'fieldset', false);
    document.querySelector('#address').readOnly = true;
    validateGuests();
    validateHousingTypes();

    var someTestArr = createObjectsArray(8); // Создание моки из 8 объектов
    renderPins(someTestArr);
  }

};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveState();
    setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
    setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);
  }
});


// Сценарий установки соответствия количества гостей (спальных мест) с количеством комнат
rooms.addEventListener('change', validateGuests);
roomType.addEventListener('change', validateHousingTypes);
timeIn.addEventListener('change', validateCheckOut);
timeOut.addEventListener('change', validateCheckIn);

// Перевод ошибок ввода на русский язык - событие invalid
var adHeader = document.querySelector('#title');
adHeader.addEventListener('invalid', function () {
  if (adHeader.validity.tooShort) {
    adHeader.setCustomValidity('Минимальная длина — 30 символов');
  } else if (adHeader.validity.tooLong) {
    adHeader.setCustomValidity('Максимальная длина — 100 символов');
  } else if (adHeader.validity.valueMissing) {
    adHeader.setCustomValidity('Обязательное поле');
  } else {
    // Самое главное при работе с обработчиками валидации — не забыть сбросить значение поля, если это значение стало корректно.
    adHeader.setCustomValidity('');
  }
});

var adPricePerNight = document.querySelector('#price');
adPricePerNight.addEventListener('invalid', function () {
  if (adPricePerNight.validity.rangeOverflow) {
    adPricePerNight.setCustomValidity('Максимальное значение — 1 000 000');
  } else if (adPricePerNight.validity.rangeUnderflow) {
    adPricePerNight.setCustomValidity('Минимальное значение - ' + adPricePerNight.placeholder);
  } else if (adPricePerNight.validity.valueMissing) {
    adPricePerNight.setCustomValidity('Обязательное поле');
  } else {
    adPricePerNight.setCustomValidity('');
  }
});
