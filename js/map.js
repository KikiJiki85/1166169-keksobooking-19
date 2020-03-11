'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;
  var LABEL_CENTER = 33;
  var PIN_POINTER_X = 33;
  var PIN_POINTER_Y = 84;

  var ErrorNode = {
    STYLES: 'z-index: 100; margin: 0 auto; text-align: center; background-color: crimson; padding-top: 5px; padding-bottom: 5px',
    POSITION_STATE: 'absolute',
    LEFT_POSITION: 0,
    RIGHT_POSITION: 0,
    TOP_POSITION: '20px',
    TEXT_COLOR: '#ffffff',
    FONTSIZE: '26px'
  };

  var backup = [];
  var pinMain = document.querySelector('.map__pin--main');

  var popupEscPressHandler = function (evtEscCard) {
    if (evtEscCard.key === ESC_KEY) {
      window.card.close();
    }
  };

  var pinEnterPressHandler = function (evtEnterPin, element) {
    if (evtEnterPin.key === ENTER_KEY) {
      window.card.render(element);
    }
  };

  var pinClickPageActivationHandler = function (evtPinClick) {
    pageActivation(evtPinClick.button === LEFT_MOUSE_BUTTON);
    pinMain.removeEventListener('mousedown', pinClickPageActivationHandler);
    pinMain.removeEventListener('keydown', pinPressEnterPageActivationHandler);
  };

  var pinPressEnterPageActivationHandler = function (evtPinPress) {
    pageActivation(evtPinPress.key === ENTER_KEY);
    pinMain.removeEventListener('mousedown', pinClickPageActivationHandler);
    pinMain.removeEventListener('keydown', pinPressEnterPageActivationHandler);
  };

  var successDataReceiveHandler = function (data) {
    window.map.backup = data;
    window.pin.render(data);
  };

  var errorDataReceiveHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = ErrorNode.STYLES;
    node.style.position = ErrorNode.POSITION_STATE;
    node.style.color = ErrorNode.TEXT_COLOR;
    node.style.left = ErrorNode.LEFT_POSITION;
    node.style.right = ErrorNode.RIGHT_POSITION;
    node.style.top = ErrorNode.TOP_POSITION;
    node.style.fontSize = ErrorNode.FONTSIZE;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

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

  pinMain.addEventListener('mousedown', pinClickPageActivationHandler);
  pinMain.addEventListener('keydown', pinPressEnterPageActivationHandler);


  setPassiveState();

  window.map = {
    PIN_POINTER_X: PIN_POINTER_X,
    PIN_POINTER_Y: PIN_POINTER_Y,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
    setActiveState: setActiveState,
    setPassiveState: setPassiveState,
    backup: backup,
    pinMain: pinMain,
    popupEscPressHandler: popupEscPressHandler,
    pinEnterPressHandler: pinEnterPressHandler,
    pinClickPageActivationHandler: pinClickPageActivationHandler,
    pinPressEnterPageActivationHandler: pinPressEnterPageActivationHandler
  };

})();
