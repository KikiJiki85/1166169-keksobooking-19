'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LABEL_CENTER = 33;
  var PIN_POINTER_X = 33;
  var PIN_POINTER_Y = 84;

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

  var pinClickPageActivationHandler = function (evt) {
    pageActivation(evt.button === 0);
    mapPinMain.removeEventListener('mousedown', pinClickPageActivationHandler);
    mapPinMain.removeEventListener('keydown', pinPressEnterPageActivationHandler);
  };

  var pinPressEnterPageActivationHandler = function (evt) {
    pageActivation(evt.key === ENTER_KEY);
    mapPinMain.removeEventListener('mousedown', pinClickPageActivationHandler);
    mapPinMain.removeEventListener('keydown', pinPressEnterPageActivationHandler);
  };

  var successDataReceiveHandler = function (data) {
    window.pin.render(data);
  };

  var errorDataReceiveHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: crimson; padding-top: 5px; padding-bottom: 5px';
    node.style.position = 'absolute';
    node.style.color = '#ffffff';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '20px';
    node.style.fontSize = '26px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
      window.backend.sendRequest(successDataReceiveHandler, errorDataReceiveHandler, 'GET', window.backend.LOAD_URL);
    }
  };

  // Функция перевода страницы в активное состояние п 1.2 ТЗ
  var setPassiveState = function () {
    if (!document.querySelector('.map--faded')) {
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
    }
    window.form.setFormDisableAttr('.ad-form', 'fieldset', true);
    window.form.setFormDisableAttr('.map__filters', 'select', true);
    window.form.setFormDisableAttr('.map__filters', 'fieldset', true);
    window.form.setPinAdress(LABEL_CENTER, LABEL_CENTER);
  };

  var pageActivation = function (condition) {
    if (condition) {
      setActiveState();
      window.form.setPinAdress(PIN_POINTER_X, PIN_POINTER_Y);
    }
  };

  // Активация страницы
  mapPinMain.addEventListener('mousedown', pinClickPageActivationHandler);
  mapPinMain.addEventListener('keydown', pinPressEnterPageActivationHandler);


  // Установка неактивного состояния п 1.1 ТЗ
  setPassiveState();

  window.map = {
    popupEscPressHandler: popupEscPressHandler,
    pinEnterPressHandler: pinEnterPressHandler,
    pinClickPageActivationHandler: pinClickPageActivationHandler,
    pinPressEnterPageActivationHandler: pinPressEnterPageActivationHandler,
    setActiveState: setActiveState,
    setPassiveState: setPassiveState,
    PIN_POINTER_X: PIN_POINTER_X,
    PIN_POINTER_Y: PIN_POINTER_Y,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };

})();
