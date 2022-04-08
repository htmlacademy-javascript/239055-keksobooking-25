import {
  switchUserForm,
  switchFilter
} from './switchForm.js';
import { createCard } from './createCard.js';

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
switchUserForm();
switchFilter();

const mapCanvas = L.map('map-canvas');
mapCanvas.on('load', () => {
  switchUserForm(true);
});
mapCanvas.setView(DEFAULT_MARKER_POSITION, DEFAULT_VIEW);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainMarkerIcon = L.icon(MAIN_MARKER);
const mainMarker = L.marker(DEFAULT_MARKER_POSITION, {draggable: true, icon: mainMarkerIcon});
mainMarker.addTo(mapCanvas);

mainMarker.on('move', () => {
  const position = mainMarker.getLatLng();
  address.value = `${position.lat.toFixed(DECIMAL)}, ${position.lng.toFixed(DECIMAL)}`;
});

const similarMarkerIcon = L.icon(SIMILAR_MARKER);

const similarMarkerGroup = L.layerGroup();

const renderCards = (cards) => {
  similarMarkerGroup.clearLayers();
  cards.forEach((element) => {
    const {location: {lat, lng}} = element;
    const similarMarker = L.marker([lat, lng], {icon: similarMarkerIcon});
    similarMarker.addTo(similarMarkerGroup);
    similarMarkerGroup.addTo(mapCanvas);
    similarMarker.bindPopup(createCard(element));
    switchFilter(true);
  });
};

export {
  mainMarker,
  DEFAULT_MARKER_POSITION,
  DEFAULT_VIEW,
  mapCanvas,
  address,
  renderCards
};
