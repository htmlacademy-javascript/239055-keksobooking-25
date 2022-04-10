const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PREVIEW_HOUSING_SIZE = {
  width: 70,
  height: 70
};
const userPhotoChooser = document.querySelector('#avatar');
const previewUserPhoto = document.querySelector('.ad-form-header__preview img');
const housingPhotoChooser = document.querySelector('#images');
const previewHousingPhoto = document.querySelector('.ad-form__photo');

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewUserPhoto.src = URL.createObjectURL(file);
  }
});

housingPhotoChooser.addEventListener('change', () => {
  const file = housingPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.width = PREVIEW_HOUSING_SIZE.width;
    image.height = PREVIEW_HOUSING_SIZE.height;
    previewHousingPhoto.append(image);
  }
});

export {
  previewUserPhoto,
  previewHousingPhoto
};
