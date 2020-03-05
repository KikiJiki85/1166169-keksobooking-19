'use strict';
(function () {
  var PIN_CENTER_WIDTH = 25;
  var PIN_CENTER_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content;

  // Функция создание пина
  var create = function (pinElement) {
    var pinTemplateObject = pinTemplate.querySelector('.map__pin');
    var newPin = pinTemplateObject.cloneNode(true);
    newPin.style.left = (pinElement.location.x - PIN_CENTER_WIDTH) + 'px';
    newPin.style.top = (pinElement.location.y - PIN_CENTER_HEIGHT) + 'px';
    newPin.querySelector('img').src = pinElement.author.avatar;
    newPin.querySelector('img').alt = pinElement.offer.title;
    newPin.addEventListener('click', function () {
      window.card.render(pinElement);
    });
    newPin.addEventListener('keydown', window.map.pinEnterPressHandler(pinElement));
    return newPin;
  };

  // Функция отрисовки пина
  var render = function (array) {
    array.forEach(function (currentRenderElement) {
      if (currentRenderElement.offer) {
        document.querySelector('.map__pins').appendChild(create(currentRenderElement));
      }
    });
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
    remove: remove
  };
})();
