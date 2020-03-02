'use strict';
(function () {
  var housingTypeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content;

  // Функция создания доступных удобств в карточке
  var createListFeatures = function (node, featuresArr) {
    node.querySelector('.popup__features').innerHTML = '';
    for (var i = 0; i < featuresArr.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + featuresArr[i]);
      node.querySelector('.popup__features').appendChild(featureElement);
    }
  };

  // Функция создания и отрисовки доступных фотографий в карточке
  var createListPhotos = function (node, photosArr) {
    node.querySelector('.popup__photos').innerHTML = '';
    for (var i = 0; i < photosArr.length; i++) {
      var offerPhoto = document.createElement('img');
      offerPhoto.classList.add('popup__photo');
      offerPhoto.src = photosArr[i];
      offerPhoto.width = 45;
      offerPhoto.height = 40;
      offerPhoto.alt = 'Фотография жилья';
      node.querySelector('.popup__photos').appendChild(offerPhoto);
    }
  };

  var create = function (cardElement) {
    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__title').textContent = cardElement.offer.title;
    newCard.querySelector('.popup__text--address').textContent = cardElement.offer.address;
    newCard.querySelector('.popup__text--price').textContent = cardElement.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = housingTypeMap[cardElement.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = cardElement.offer.rooms + ' комнаты для ' + cardElement.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
    createListFeatures(newCard, cardElement.offer.features);
    newCard.querySelector('.popup__description').textContent = cardElement.offer.description;
    createListPhotos(newCard, cardElement.offer.photos);
    newCard.querySelector('.popup__avatar').src = cardElement.author.avatar;
    newCard.querySelector('.popup__close').addEventListener('click', function () {
      close();
    });
    document.addEventListener('keydown', window.map.popupEscPressHandler);
    return newCard;
  };

  // Функция подготовки шаблона карточки объявления и ее вставки на страницу (метод отрисовки карточки)
  var render = function (cardElement) {
    close(cardElement);
    if (!document.querySelector('.map__card')) {
      document.querySelector('.map').insertBefore(create(cardElement), document.querySelector('.map__filters-container'));
    }
  };

  // Функция закрытия(удаления) карточки
  var close = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', window.map.popupEscPressHandler);
    }
  };

  window.card = {
    create: create,
    render: render,
    close: close
  };

})();
