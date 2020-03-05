'use strict';
(function () {
  // Словарь соответствия изменения количества комнат и количества гостей
  var ROOMS_FOR_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var MAP_PIN_X_START = '570px';
  var MAP_PIN_Y_START = '375px';

  var housingTypeMinCostMap = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0'
  };

  var adHeader = document.querySelector('#title');
  var adPricePerNight = document.querySelector('#price');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var roomType = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetForm = adForm.querySelector('.ad-form__reset');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var housePhotoPreview = document.querySelector('.ad-form__photo');
  var housePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');

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

  // 3.3 Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var validateHousingTypes = function () {
    var selectedRoomTypes = roomType.querySelectorAll('option');
    selectedRoomTypes.forEach(function (currentHousingOption) {
      if (roomType.value === currentHousingOption.value) {
        document.querySelector('#price').min = housingTypeMinCostMap[currentHousingOption.value];
        document.querySelector('#price').placeholder = '' + housingTypeMinCostMap[currentHousingOption.value];
      }
    });
  };

  // 3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
  var validateCheckOut = function () {
    timeOut.value = timeIn.value;
  };

  var validateCheckIn = function () {
    timeIn.value = timeOut.value;
  };

  // Перевод ошибок ввода на русский язык - событие invalid
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

  // Обработчик показа и закрытия окна об успешной отправке формы
  var successDataSendHandler = function () {
    var successMsgDiv = document.querySelector('#success').content.querySelector('.success');
    var newMsg = successMsgDiv.cloneNode(true);
    document.querySelector('main').appendChild(newMsg);

    var removeSuccessNode = function () {
      newMsg.remove();
      document.removeEventListener('click', successDivClickHandler);
      document.removeEventListener('keydown', successDivEscPressHandler);
    };

    var successDivClickHandler = function () {
      removeSuccessNode();
    };

    var successDivEscPressHandler = function (evtSucessKeydown) {
      if (evtSucessKeydown.key === document.map.ESC_KEY) {
        removeSuccessNode();
      }
    };
    document.addEventListener('click', successDivClickHandler);
    document.addEventListener('keydown', successDivEscPressHandler);

    // После успешной передачи данных на сервер верните страницу в неактивное состояние и сбросьте форму.
    window.pin.remove();
    window.card.close();
    window.filters.setFilterToDefault();
    resetAdForm();
    validateGuests();
    validateHousingTypes();
    window.map.setPassiveState();
    mapPinMain.style.top = MAP_PIN_Y_START;
    mapPinMain.style.left = MAP_PIN_X_START;
    mapPinMain.addEventListener('mousedown', window.map.pinClickPageActivationHandler);
    mapPinMain.addEventListener('keydown', window.map.pinPressEnterPageActivationHandler);
  };

  var resetAdForm = function () {
    adForm.reset();
    avatarPreview.src = 'img/muffin-grey.svg';
    housePhotoPreview.style.backgroundImage = '';
  };

  // Обработчик показа и закрытия окна о неудачной отправке формы
  var errorDataSendHandler = function () {
    var errorMsgDiv = document.querySelector('#error').content.querySelector('.error');
    var newErrorMsg = errorMsgDiv.cloneNode(true);
    document.querySelector('main').appendChild(newErrorMsg);

    var removeErrorNode = function () {
      newErrorMsg.remove();
      document.removeEventListener('keydown', errorDivEscPressHandler);
      document.removeEventListener('click', errorDivClickHandler);
      document.removeEventListener('click', errorDivButtonClickHandler);
    };

    var errorDivEscPressHandler = function (evtErrorKeydown) {
      if (evtErrorKeydown.key === window.map.ESC_KEY) {
        removeErrorNode();
      }
    };

    var errorDivClickHandler = function () {
      removeErrorNode();
    };

    var errorDivButtonClickHandler = function () {
      removeErrorNode();
    };

    document.addEventListener('keydown', errorDivEscPressHandler);
    document.querySelector('.error__button').addEventListener('click', errorDivButtonClickHandler);
    document.addEventListener('click', errorDivClickHandler);
  };

  // Обработчик отправки формы и возврата первоначального состояния
  adForm.addEventListener('submit', function (evtSend) {
    window.backend.sendRequest(successDataSendHandler, errorDataSendHandler, 'POST', window.backend.SAVE_URL, new FormData(adForm));
    evtSend.preventDefault();
  });

  var resetFormHandler = function (evtFormReset) {
    evtFormReset.preventDefault();
    resetAdForm();
    validateGuests();
    validateHousingTypes();
    window.form.setPinAdress(window.map.PIN_POINTER_X, window.map.PIN_POINTER_Y);
  };

  // Сброс формы по клику на кнопку очистить
  resetForm.addEventListener('click', resetFormHandler);
  // Сброс формы по нажатию на ENTER при фокусе на кнопке
  resetForm.addEventListener('keydown', function (evtFormPressReset) {
    if (evtFormPressReset.key === window.map.ENTER_KEY) {
      resetFormHandler();
    }
  });

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

  // Обработчик загрузки аватарки
  var uploadAvatarHandler = function () {
    window.images.uploadPhoto(avatarChooser, avatarPreview);
  };

  // Обработчик загрузки картинки жилья
  var uploadHousePhotoHandler = function () {
    window.images.uploadPhoto(housePhotoChooser, housePhotoPreview);
  };


  avatarChooser.addEventListener('change', uploadAvatarHandler);
  housePhotoChooser.addEventListener('change', uploadHousePhotoHandler);

  // Сценарий установки соответствия количества гостей (спальных мест) с количеством комнат
  rooms.addEventListener('change', validateGuests);
  roomType.addEventListener('change', validateHousingTypes);
  timeIn.addEventListener('change', validateCheckOut);
  timeOut.addEventListener('change', validateCheckIn);

  window.form = {
    validateGuests: validateGuests,
    validateHousingTypes: validateHousingTypes,
    validateCheckOut: validateCheckOut,
    validateCheckIn: validateCheckIn,
    setFormDisableAttr: setFormDisableAttr,
    setPinAdress: setPinAdress
  };
})();
