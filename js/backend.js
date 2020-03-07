'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var RESPONSE_TYPE = 'json';

  var statusCodeMap = {
    OK: 200
  };

  var sendRequest = function (onLoad, onError, sendMethod, url, dataSend) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCodeMap.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS; // 10s
    xhr.open(sendMethod, url);
    xhr.send(dataSend);
  };

  window.backend = {
    LOAD_URL: LOAD_URL,
    SAVE_URL: SAVE_URL,
    sendRequest: sendRequest
  };
})();
