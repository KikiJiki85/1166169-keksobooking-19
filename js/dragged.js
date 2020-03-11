'use strict';
(function () {
  var PIN_POINTER_X_MIN_VALUE = -34;
  var PIN_POINTER_X_MAX_VALUE = 1168;
  var PIN_POINTER_Y_MIN_VALUE = 45;
  var PIN_POINTER_Y_MAX_VALUE = 547;

  window.map.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.map.LEFT_MOUSE_BUTTON) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
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
        if ((window.map.pinMain.offsetTop - shift.y) > PIN_POINTER_Y_MIN_VALUE && (window.map.pinMain.offsetTop - shift.y) < PIN_POINTER_Y_MAX_VALUE) {
          window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + 'px';
        }
        if ((window.map.pinMain.offsetLeft - shift.x) > PIN_POINTER_X_MIN_VALUE && (window.map.pinMain.offsetLeft - shift.x) < PIN_POINTER_X_MAX_VALUE) {
          window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + 'px';
        }
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

    }
  });
})();
