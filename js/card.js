'use strict';
(function () {
  var PHOTO_TEXT = 'Фотография жилья';
  var PHOTO_HEIGHT = 40;
  var PHOTO_WIDTH = 45;

  var housingTypeMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var cardTemplate = document.querySelector('#card').content;

  // Функция создания доступных удобств в карточке
  var createListFeatures = function (featureNode, featuresArr) {
    featureNode.querySelector('.popup__features').innerHTML = '';
    featuresArr.forEach(function (currentFeatureElement) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + currentFeatureElement);
      featureNode.querySelector('.popup__features').appendChild(featureElement);
    });
  };

  // Функция создания и отрисовки доступных фотографий в карточке
  var createListPhotos = function (listPhotoNode, photosArr) {
    listPhotoNode.querySelector('.popup__photos').innerHTML = '';
    photosArr.forEach(function (currentListPhotoElement) {
      var offerPhoto = document.createElement('img');
      offerPhoto.classList.add('popup__photo');
      offerPhoto.src = currentListPhotoElement;
      offerPhoto.width = PHOTO_WIDTH;
      offerPhoto.height = PHOTO_HEIGHT;
      offerPhoto.alt = PHOTO_TEXT;
      listPhotoNode.querySelector('.popup__photos').appendChild(offerPhoto);
    });

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
