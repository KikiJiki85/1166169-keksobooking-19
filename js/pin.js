'use strict';
(function () {
  var PIN_CENTER_WIDTH = 25;
  var PIN_CENTER_HEIGHT = 70;
  var MAX_ADVERTISEMENTS = 5;
  var pinTemplate = document.querySelector('#pin').content;
  var renderCounter = 0;
  var lastPin;

  var removeSelection = function () {
    if (lastPin) {
      lastPin.classList.remove('map__pin--active');
    }
  };

  var activatePin = function (pin) {
    removeSelection();
    lastPin = pin;
    pin.classList.add('map__pin--active');
  };

  var create = function (pinElement) {
    var pinTemplateObject = pinTemplate.querySelector('.map__pin');
    var newPin = pinTemplateObject.cloneNode(true);
    newPin.style.left = (pinElement.location.x - PIN_CENTER_WIDTH) + 'px';
    newPin.style.top = (pinElement.location.y - PIN_CENTER_HEIGHT) + 'px';
    newPin.querySelector('img').src = pinElement.author.avatar;
    newPin.querySelector('img').alt = pinElement.offer.title;
    newPin.addEventListener('click', function () {
      window.card.render(pinElement);
      activatePin(newPin);
    });
    newPin.addEventListener('keydown', window.map.pinEnterPressHandler(pinElement));
    return newPin;
  };

  var render = function (array) {
    array.length >= MAX_ADVERTISEMENTS ? renderCounter = MAX_ADVERTISEMENTS : renderCounter = array.length;
    for (var i = 0; i < renderCounter; i++) {
      if (array[i].offer) {
        document.querySelector('.map__pins').appendChild(create(array[i]));
      }
    };
  };

  var remove = function () {
    var allRenderedPins = document.querySelectorAll('.map__pin');
    var mainPin = document.querySelector('.map__pin--main');
    allRenderedPins.forEach(function (currentRemovingElement) {
      if (currentRemovingElement !== mainPin) {
        currentRemovingElement.remove();
      }
    });
  };

  window.pin = {
    create: create,
    render: render,
    remove: remove,
    removeSelection: removeSelection
  };
})();
