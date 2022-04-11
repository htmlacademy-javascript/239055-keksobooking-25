import { createCard } from './create-card.js';
import {
  switchFilter,
  switchUserForm
} from './switch-form.js';
import {
  debounce
} from './util.js';
import { getData } from './api.js';
import {
  getFilteredArray,
  onChangeFilter
} from './filter.js';

const DELAY_POPUP_MESSAGE = 3000;
const RERENDER_DELAY = 500;
const DEFAULT_MARKER_POSITION = [35.69467, 139.76326];
const DEFAULT_VIEW = 10;
const MAIN_MARKER = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [25, 52]
};
const SIMILAR_MARKER = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
};
const DECIMAL = 5;

const address = document.querySelector('#address');
address.value = DEFAULT_MARKER_POSITION;

const showDataErrorMessage = (textMessage, delay) => () => {
  const messageContainer = document.querySelector('.map__canvas');
  const message = document.createElement('div');
  message.style.zIndex = 1000;
  message.style.padding = '50px';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  message.style.width = '50%';
  message.style.left = '50%';
  message.style.top = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.borderRadius = '20px';
  message.style.position = 'absolute';
  message.style.margin = '0 auto';
  message.style.backgroundColor = '#ededed';
  message.style.opacity = '0.9';
  message.textContent = textMessage;
  messageContainer.append(message);

  if (delay) {
    setTimeout(() => {
      message.remove();
    }, delay);
  }
};

switchUserForm();
switchFilter();

const mapCanvas = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

mapCanvas.on('load', () => {
  switchUserForm(true);
  getData(
    (data) => {
      renderCards(getFilteredArray(data));
      switchFilter(true);
      onChangeFilter(debounce(() => {
        const filteredData = getFilteredArray(data);
        if (!filteredData.length) {
          const show = showDataErrorMessage('Нет соответствующих объявлений', DELAY_POPUP_MESSAGE);
          show();
        }
        renderCards(filteredData);
      }, RERENDER_DELAY));
    },
    showDataErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу', DELAY_POPUP_MESSAGE)
  );
});
mapCanvas.setView(DEFAULT_MARKER_POSITION, DEFAULT_VIEW);

const mainMarkerIcon = L.icon(MAIN_MARKER);
const mainMarker = L.marker(DEFAULT_MARKER_POSITION, {draggable: true, icon: mainMarkerIcon});
mainMarker.addTo(mapCanvas);

mainMarker.on('move', () => {
  const position = mainMarker.getLatLng();
  address.value = `${position.lat.toFixed(DECIMAL)}, ${position.lng.toFixed(DECIMAL)}`;
});

const similarMarkerIcon = L.icon(SIMILAR_MARKER);

const similarMarkerGroup = L.layerGroup();

function renderCards (cards) {
  similarMarkerGroup.clearLayers();
  cards.forEach((element) => {
    const {location: {lat, lng}} = element;
    const similarMarker = L.marker([lat, lng], {icon: similarMarkerIcon});
    similarMarker.addTo(similarMarkerGroup);
    similarMarkerGroup.addTo(mapCanvas);
    similarMarker.bindPopup(createCard(element));
  });
}

export {
  mainMarker,
  DEFAULT_MARKER_POSITION,
  DEFAULT_VIEW,
  mapCanvas,
  address,
  renderCards
};
