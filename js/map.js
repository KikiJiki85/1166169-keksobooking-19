'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LABEL_CENTER = 33;
  var PIN_POINTER_X = 33;
  var PIN_POINTER_Y = 84;

  var mapPinMain = document.querySelector('.map__pin--main');

  // Функция отрисовки пина
  var renderPins = function (array) {
    array.forEach(function (currentElement) {
      document.querySelector('.map__pins').appendChild(window.pin.create(currentElement));
    });
  };

  // Функция подготовки шаблона карточки объявления и ее вставки на страницу (метод отрисовки карточки)
  var renderCard = function (cardElement) {
    closeCard(cardElement);
    if (!document.querySelector('.map__card')) {
      document.querySelector('.map').insertBefore(window.card.create(cardElement), document.querySelector('.map__filters-container'));
    }
  };

  // Добавьте возможность закрытия карточки с подробной информацией по нажатию клавиши Esc и клике по иконке закрытия;
  var popupEscPressHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCard();
    }
  };

  // Добавьте поддержку открытия карточки объявления с клавиатуры. Карточка объявления для выбранной метки открывается при нажатии на клавишу Enter.
  var pinEnterPressHandler = function (evt, element) {
    if (evt.key === ENTER_KEY) {
      renderCard(element);
    }
  };

  // Функция закрытия(удаления) карточки
  var closeCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', popupEscPressHandler);
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
      renderPins(someTestArr);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      setActiveState();
      window.form.setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);
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
    renderPins: renderPins,
    renderCard: renderCard,
    closeCard: closeCard,
    popupEscPressHandler: popupEscPressHandler,
    pinEnterPressHandler: pinEnterPressHandler,
    setActiveState: setActiveState
  };

})();
