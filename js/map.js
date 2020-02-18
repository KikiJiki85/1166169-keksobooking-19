'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LABEL_CENTER = 33;
  var PIN_POINTER_X = 33;
  var PIN_POINTER_Y = 84;
  var PIN_POINTER_X_MIN_VALUE = -34;
  var PIN_POINTER_X_MAX_VALUE = 1168;
  var PIN_POINTER_Y_MIN_VALUE = 45;
  var PIN_POINTER_Y_MAX_VALUE = 547;

  var mapPinMain = document.querySelector('.map__pin--main');

  // Добавьте возможность закрытия карточки с подробной информацией по нажатию клавиши Esc и клике по иконке закрытия;
  var popupEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      window.card.close();
    }
  };

  // Добавьте поддержку открытия карточки объявления с клавиатуры. Карточка объявления для выбранной метки открывается при нажатии на клавишу Enter.
  var pinEnterPressHandler = function (evt, element) {
    if (evt.key === ENTER_KEY) {
      window.card.render(element);
    }
  };


  // Функция перевода страницы в активное состояние п 1.2 ТЗ
  var setActiveState = function () {
    if (document.querySelector('.map--faded')) {
      document.querySelector('.map--faded').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
      window.form.setFormDisableAttr('.ad-form', 'fieldset', false);
      window.form.setFormDisableAttr('.map__filters', 'select', false);
      window.form.setFormDisableAttr('.map__filters', 'fieldset', false);
      document.querySelector('#address').readOnly = true;
      window.form.validateGuests();
      window.form.validateHousingTypes();
      var someTestArr = window.data.createObjectsArray(8); // Создание моки из 8 объектов
      window.pin.render(someTestArr);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      setActiveState();
      window.form.setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        window.form.setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        if ((mapPinMain.offsetTop - shift.y) > PIN_POINTER_Y_MIN_VALUE && (mapPinMain.offsetTop - shift.y) < PIN_POINTER_Y_MAX_VALUE) {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }
        if ((mapPinMain.offsetLeft - shift.x) > PIN_POINTER_X_MIN_VALUE && (mapPinMain.offsetLeft - shift.x) < PIN_POINTER_X_MAX_VALUE) {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      setActiveState();
      window.form.setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);
    }
  });

  // Установка неактивного состояния п 1.1 ТЗ
  window.form.setFormDisableAttr('.ad-form', 'fieldset', true);
  window.form.setFormDisableAttr('.map__filters', 'select', true);
  window.form.setFormDisableAttr('.map__filters', 'fieldset', true);
  window.form.setPinAdress(LABEL_CENTER, LABEL_CENTER);

  window.map = {
    popupEscPressHandler: popupEscPressHandler,
    pinEnterPressHandler: pinEnterPressHandler,
    setActiveState: setActiveState
  };

})();
