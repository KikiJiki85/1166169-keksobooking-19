'use strict';
(function () {
  // Словарь соответствия изменения количества комнат и количества гостей
  var ROOMS_FOR_GUESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var adHeader = document.querySelector('#title');
  var adPricePerNight = document.querySelector('#price');
  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var roomType = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Функция установки соответствия количества комнат и количества гостей
  var validateGuests = function () {
    var validGuestsOptions = ROOMS_FOR_GUESTS[rooms.value]; // Валидные опции из словаря
    var guestsOptions = guests.querySelectorAll('option'); // Находим все опции по количеству мест (гостям)
    guestsOptions.forEach(function (currentOption) { // Перебор всех доступных опций в коллекции
      currentOption.disabled = true; // Блокируем все по-умолчанию
      currentOption.selected = false; // Сбрасываем выбор selected
      var index = validGuestsOptions.indexOf(currentOption.value); // Находим в списке валидных опций нашу опцию
      if (index >= 0) {
        currentOption.disabled = false; // Разблокировка опции, если она есть в словаре
        if (index === 0) {
          currentOption.selected = true; // Первый элемент выставляем в selected
        }
      }
    });
  };

  // 3.3 Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
  var validateHousingTypes = function () {
    var selectedRoomTypes = roomType.querySelectorAll('option');
    selectedRoomTypes.forEach(function (currentOption) {
      if (roomType.value === currentOption.value) {
        document.querySelector('#price').min = window.data.HousingTypesMinCost[currentOption.value];
        document.querySelector('#price').placeholder = '' + window.data.HousingTypesMinCost[currentOption.value];
      }
    });
  };

  // 3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
  var validateCheckOut = function () {
    timeOut.value = timeIn.value;
  };

  var validateCheckIn = function () {
    timeIn.value = timeOut.value;
  };

  // Перевод ошибок ввода на русский язык - событие invalid
  adHeader.addEventListener('invalid', function () {
    if (adHeader.validity.tooShort) {
      adHeader.setCustomValidity('Минимальная длина — 30 символов');
    } else if (adHeader.validity.tooLong) {
      adHeader.setCustomValidity('Максимальная длина — 100 символов');
    } else if (adHeader.validity.valueMissing) {
      adHeader.setCustomValidity('Обязательное поле');
    } else {
      // Самое главное при работе с обработчиками валидации — не забыть сбросить значение поля, если это значение стало корректно.
      adHeader.setCustomValidity('');
    }
  });

  adPricePerNight.addEventListener('invalid', function () {
    if (adPricePerNight.validity.rangeOverflow) {
      adPricePerNight.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (adPricePerNight.validity.rangeUnderflow) {
      adPricePerNight.setCustomValidity('Минимальное значение - ' + adPricePerNight.placeholder);
    } else if (adPricePerNight.validity.valueMissing) {
      adPricePerNight.setCustomValidity('Обязательное поле');
    } else {
      adPricePerNight.setCustomValidity('');
    }
  });

  // Функция скрытия-показа элементов управления формы (input, select и т. д. должны быть неактивны в исходном состоянии)
  var setFormDisableAttr = function (form, field, attrStatus) {
    var inputArray = document.querySelector(form).querySelectorAll(field);
    for (var i = 0; i < inputArray.length; i++) {
      inputArray[i].disabled = attrStatus;
    }
  };

  // Функция установки поля ввода адреса
  var setPinAdress = function (xOffset, yOffset) {
    document.querySelector('#address').value = Math.round(parseInt(mapPinMain.style.left, 10) + xOffset) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + yOffset);
  };

  // Сценарий установки соответствия количества гостей (спальных мест) с количеством комнат
  rooms.addEventListener('change', validateGuests);
  roomType.addEventListener('change', validateHousingTypes);
  timeIn.addEventListener('change', validateCheckOut);
  timeOut.addEventListener('change', validateCheckIn);

  window.form = {
    validateGuests: validateGuests,
    validateHousingTypes: validateHousingTypes,
    validateCheckOut: validateCheckOut,
    validateCheckIn: validateCheckIn,
    setFormDisableAttr: setFormDisableAttr,
    setPinAdress: setPinAdress
  };
})();
