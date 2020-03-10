'use strict';
(function () {
  var MAX_ADVERTISEMENTS = 5;
  var FILTER_DEFUALT_VALUE = 'any';
  var RADIX_VALUE = 10;

  var priceTypeMap = {
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var priceValueMap = {
    min: 10000,
    max: 50000
  };

  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelectorAll('.map__checkbox');

  // Основная функция фильтрации входных данных
  var mapFiltersApply = function (data) {
    return data.filter(function (currentElement) {
      return (
        getHousingType(currentElement) &&
        getHousingPrice(currentElement) &&
        getHousingRooms(currentElement) &&
        getHousingGuests(currentElement) &&
        getHousingFeatures(currentElement)
      );
    }).slice(0, MAX_ADVERTISEMENTS);
  };

  // Функция фильтра типа жилья
  var getHousingType = function (typeElement) {
    return housingType.value === FILTER_DEFUALT_VALUE ? true : typeElement.offer.type === housingType.value;
  };

  // Функция фильтра цены жилья
  var getHousingPrice = function (priceElement) {
    switch (housingPrice.value) {
      case priceTypeMap.low:
        return priceElement.offer.price < priceValueMap.min;
      case priceTypeMap.middle:
        return priceElement.offer.price >= priceValueMap.min && priceElement.offer.price <= priceValueMap.max;
      case priceTypeMap.high:
        return priceElement.offer.price > priceValueMap.max;
      default:
        return true;
    }
  };

  // Функция фильтра кол-ва комнат
  var getHousingRooms = function (roomsElement) {
    return housingRooms.value === FILTER_DEFUALT_VALUE ? true : parseInt(housingRooms.value, RADIX_VALUE) === roomsElement.offer.rooms;
  };

  // Функция фильтра числа гостей
  var getHousingGuests = function (guestsElement) {
    return housingGuests.value === FILTER_DEFUALT_VALUE ? true : parseInt(housingGuests.value, RADIX_VALUE) === guestsElement.offer.guests;
  };

  // Функция фильтра дополнительных опций
  var getHousingFeatures = function (featuresElement) {
    var result = true;
    housingFeatures.forEach(function (currentFeature) {
      if (currentFeature.checked && featuresElement.offer.features.indexOf(currentFeature.value) === -1) {
        result = false;
      }
    });
    return result;
  };

  var setFilterToDefault = function () {
    housingType.value = FILTER_DEFUALT_VALUE;
    housingPrice.value = FILTER_DEFUALT_VALUE;
    housingRooms.value = FILTER_DEFUALT_VALUE;
    housingGuests.value = FILTER_DEFUALT_VALUE;
    housingFeatures.forEach(function (feature) {
      if (feature.checked) {
        feature.checked = false;
      }
    });
  };

  filtersForm.addEventListener('change', function () {
    window.debounce(function () {
      window.pin.remove();
      window.card.close();
      window.pin.render(mapFiltersApply(window.map.backup));
    })();
  });

  window.filters = {
    MAX_ADVERTISEMENTS: MAX_ADVERTISEMENTS,
    mapFiltersApply: mapFiltersApply,
    setFilterToDefault: setFilterToDefault
  };
})();
