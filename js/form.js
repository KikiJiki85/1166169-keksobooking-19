'use strict';
(function () {

  var MAP_PIN_X_START = '570px';
  var MAP_PIN_Y_START = '375px';
  var RADIX_VALUE = 10;
  var AVATAR_SRC = 'img/muffin-grey.svg';
  var FIELD_MIN_LENGTH = 30;
  var FIELD_MAX_LENGTH = 100;
  var FIELD_MAX_VALUE = 1000000;

  var housingTypeMinCostMap = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0'
  };

  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var avatarChooser = adForm.querySelector('.ad-form__field input[type=file]');
  var housePhotoPreview = adForm.querySelector('.ad-form__photo');
  var housePhotoChooser = adForm.querySelector('.ad-form__upload input[type=file]');
  var mainMsg = document.querySelector('main');

  var validateGuests = function () {
    var validGuestsOptions = roomsForGuestsMap[rooms.value];
    var guestsOptions = guests.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      currentOption.disabled = true;
      currentOption.selected = false;
      var index = validGuestsOptions.indexOf(currentOption.value);
      if (index >= 0) {
        currentOption.disabled = false;
        if (index === 0) {
          currentOption.selected = true;
        }
      }
    });
  };

  var validateHousingTypes = function () {
    var selectedRoomTypes = roomType.querySelectorAll('option');
    selectedRoomTypes.forEach(function (currentHousingOption) {
      if (roomType.value === currentHousingOption.value) {
        document.querySelector('#price').min = housingTypeMinCostMap[currentHousingOption.value];
        document.querySelector('#price').placeholder = '' + housingTypeMinCostMap[currentHousingOption.value];
      }
    });
  };

  var validateCheckOut = function () {
    timeOut.value = timeIn.value;
  };

  var validateCheckIn = function () {
    timeIn.value = timeOut.value;
  };

  adHeader.addEventListener('invalid', function () {
    if (adHeader.validity.tooShort) {
      adHeader.setCustomValidity('Минимальная длина — ' + FIELD_MIN_LENGTH + 'символов');
    } else if (adHeader.validity.tooLong) {
      adHeader.setCustomValidity('Максимальная длина — ' + FIELD_MAX_LENGTH + ' символов');
    } else if (adHeader.validity.valueMissing) {
      adHeader.setCustomValidity('Обязательное поле');
    } else {
      adHeader.setCustomValidity('');
    }
  });

  adPricePerNight.addEventListener('invalid', function () {
    if (adPricePerNight.validity.rangeOverflow) {
      adPricePerNight.setCustomValidity('Максимальное значение — ' + FIELD_MAX_VALUE);
    } else if (adPricePerNight.validity.rangeUnderflow) {
      adPricePerNight.setCustomValidity('Минимальное значение - ' + adPricePerNight.placeholder);
    } else if (adPricePerNight.validity.valueMissing) {
      adPricePerNight.setCustomValidity('Обязательное поле');
    } else {
      adPricePerNight.setCustomValidity('');
    }
  });

  var successDataSendHandler = function () {
    var successMsgDiv = document.querySelector('#success').content.querySelector('.success');
    var newMsg = successMsgDiv.cloneNode(true);
    mainMsg.appendChild(newMsg);

    var removeSuccessNode = function () {
      newMsg.remove();
      document.removeEventListener('click', successDivClickHandler);
      document.removeEventListener('keydown', successDivEscPressHandler);
    };

    var successDivClickHandler = function () {
      removeSuccessNode();
    };

    var successDivEscPressHandler = function (evtSucessKeydown) {
      if (evtSucessKeydown.key === window.map.ESC_KEY) {
        removeSuccessNode();
      }
    };
    document.addEventListener('click', successDivClickHandler);
    document.addEventListener('keydown', successDivEscPressHandler);

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
    avatarPreview.src = AVATAR_SRC;
    housePhotoPreview.style.backgroundImage = '';
  };

  var errorDataSendHandler = function () {
    var errorMsgDiv = document.querySelector('#error').content.querySelector('.error');
    var newErrorMsg = errorMsgDiv.cloneNode(true);
    mainMsg.appendChild(newErrorMsg);

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

  resetForm.addEventListener('click', resetFormHandler);
  resetForm.addEventListener('keydown', function (evtFormPressReset) {
    if (evtFormPressReset.key === window.map.ENTER_KEY) {
      resetFormHandler();
    }
  });

  var setFormDisableAttr = function (form, field, attrStatus) {
    var inputArray = document.querySelector(form).querySelectorAll(field);
    inputArray.forEach(function (currentElement) {
      currentElement.disabled = attrStatus;
    });
  };

  var setPinAdress = function (xOffset, yOffset) {
    document.querySelector('#address').value = Math.round(parseInt(mapPinMain.style.left, RADIX_VALUE) + xOffset) + ', ' + Math.round(parseInt(mapPinMain.style.top, RADIX_VALUE) + yOffset);
  };

  var uploadAvatarHandler = function () {
    window.images.uploadPhoto(avatarChooser, avatarPreview);
  };

  var uploadHousePhotoHandler = function () {
    window.images.uploadPhoto(housePhotoChooser, housePhotoPreview);
  };


  avatarChooser.addEventListener('change', uploadAvatarHandler);
  housePhotoChooser.addEventListener('change', uploadHousePhotoHandler);

  rooms.addEventListener('change', function () {
    validateGuests();
  });
  roomType.addEventListener('change', function () {
    validateHousingTypes();
  });
  timeIn.addEventListener('change', function () {
    validateCheckOut();
  });
  timeOut.addEventListener('change', function () {
    validateCheckIn();
  });

  window.form = {
    validateGuests: validateGuests,
    validateHousingTypes: validateHousingTypes,
    validateCheckOut: validateCheckOut,
    validateCheckIn: validateCheckIn,
    setFormDisableAttr: setFormDisableAttr,
    setPinAdress: setPinAdress
  };
})();
