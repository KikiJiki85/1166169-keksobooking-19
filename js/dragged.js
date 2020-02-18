'use strict';
(function () {
  var PIN_POINTER_X_MIN_VALUE = -34;
  var PIN_POINTER_X_MAX_VALUE = 1168;
  var PIN_POINTER_Y_MIN_VALUE = 45;
  var PIN_POINTER_Y_MAX_VALUE = 547;
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        window.form.setPinAdress(window.map.PIN_POINTER_X, window.map.PIN_POINTER_Y);

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
})();
