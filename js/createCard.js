import { TYPES_AD } from './data.js';

const templateAd = document.querySelector('#card').content.querySelector('.popup');

const createCard = (itemArray) => {
  const {
    author: {
      avatar
    },
    offer: {
      title,
      address,
      price,
      type,
      rooms,
      guests,
      checkin,
      checkout,
      features,
      description,
      photos
    }
  } = itemArray;
  const someAd = templateAd.cloneNode(true);
  const titleAd = someAd.querySelector('.popup__title');
  const addressAd = someAd.querySelector('.popup__text--address');
  const priceAd = someAd.querySelector('.popup__text--price');
  const typeAd = someAd.querySelector('.popup__type');
  const capacityAd = someAd.querySelector('.popup__text--capacity');
  const timeAd = someAd.querySelector('.popup__text--time');
  const featuresAd = someAd.querySelector('.popup__features');
  const descriptionAd = someAd.querySelector('.popup__description');
  const photosAd = someAd.querySelector('.popup__photos');
  const avatarAd = someAd.querySelector('.popup__avatar');

  titleAd.textContent = title;

  addressAd.textContent = address;

  priceAd.textContent = `${price} ₽/ночь`;

  typeAd.textContent = TYPES_AD[type];

  capacityAd.textContent = `${rooms} комнаты для ${guests} гостей`;

  timeAd.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  if (features !== undefined) {
    featuresAd.innerHTML = '';
    features.forEach((element) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add(`popup__feature--${element}`);
      featuresAd.append(featureItem);
    });
  } else {
    featuresAd.remove();
  }

  if (description !== undefined) {
    descriptionAd.textContent = description;
  } else {
    descriptionAd.remove();
  }

  if (photos !== undefined) {
    photosAd.innerHTML = '';
    photos.forEach((element) => {
      const photo = document.createElement('img');
      photo.src = element;
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photosAd.appendChild(photo);
    });
  } else {
    photosAd.remove();
  }

  if (avatar !== undefined) {
    avatarAd.src = avatar;
  } else {
    avatarAd.remove();
  }

  return someAd;
};

export { createCard };
