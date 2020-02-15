'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content;

  // Функция создание пина
  var create = function (pinElement) {
    var pinTemplateObject = pinTemplate.querySelector('.map__pin');
    var newPin = pinTemplateObject.cloneNode(true);
    newPin.style.left = (pinElement.location.x - 25) + 'px';
    newPin.style.top = (pinElement.location.y - 70) + 'px';
    newPin.querySelector('img').src = pinElement.author.avatar;
    newPin.querySelector('img').alt = pinElement.offer.title;
    newPin.addEventListener('click', function () {
      window.map.renderCard(pinElement);
    });
    newPin.addEventListener('keydown', window.map.pinEnterPressHandler(pinElement));
    return newPin;
  };

  window.pin = {
    create: create
  };
})();
