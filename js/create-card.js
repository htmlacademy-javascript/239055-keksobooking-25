const TYPES_AD = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const WIDTH_PHOTO = 45;
const HEIGHT_PHOTO = 40;

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

  if (features) {
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

  if (description) {
    descriptionAd.textContent = description;
  } else {
    descriptionAd.remove();
  }

  if (photos) {
    photosAd.innerHTML = '';
    photos.forEach((element) => {
      const photo = document.createElement('img');
      photo.src = element;
      photo.classList.add('popup__photo');
      photo.width = WIDTH_PHOTO;
      photo.height = HEIGHT_PHOTO;
      photo.alt = 'Фотография жилья';
      photosAd.appendChild(photo);
    });
  } else {
    photosAd.remove();
  }

  avatarAd.src = avatar;

  return someAd;
};

export { createCard };
