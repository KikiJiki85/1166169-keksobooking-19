'use strict';
(function () {
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
    newCard.querySelector('.popup__type').textContent = window.data.HousingTypes[cardElement.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = cardElement.offer.rooms + ' комнаты для ' + cardElement.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardElement.offer.checkin + ', выезд до ' + cardElement.offer.checkout;
    createListFeatures(newCard, cardElement.offer.features);
    newCard.querySelector('.popup__description').textContent = cardElement.offer.description;
    createListPhotos(newCard, cardElement.offer.photos);
    newCard.querySelector('.popup__avatar').src = cardElement.author.avatar;
    newCard.querySelector('.popup__close').addEventListener('click', window.map.closeCard);
    document.addEventListener('keydown', window.map.popupEscPressHandler);
    return newCard;
  };

  window.card = {
    create: create
  };

})();
