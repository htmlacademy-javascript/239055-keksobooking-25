import { switchForm } from './switchForm.js';
import { createCard } from './createCard.js';

const DEFAULT_VIIEW = [35.69467, 139.76326];
const MAIN_MARKER = {
  size: [52, 52],
  anchor: [25, 52]
};
const SIMILAR_MARKER = {
  size: [40, 40],
  anchor: [20, 40]
};
const DECIMAL = 5;
const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');
address.value = DEFAULT_VIIEW;
switchForm();

const mapCanvas = L.map('map-canvas');
mapCanvas.on('load', () => {
  switchForm(true);
});
mapCanvas.setView(DEFAULT_VIIEW, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_MARKER.size,
  iconAnchor: MAIN_MARKER.anchor
});
const mainMarker = L.marker(DEFAULT_VIIEW, {draggable: true, icon: mainMarkerIcon});
mainMarker.addTo(mapCanvas);

mainMarker.on('move', () => {
  const position = mainMarker.getLatLng();
  address.value = `${position.lat.toFixed(DECIMAL)}, ${position.lng.toFixed(DECIMAL)}`;
});

const similarMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: SIMILAR_MARKER.size,
  iconAnchor: SIMILAR_MARKER.anchor
});

const renderCards = (cards) => {
  cards.forEach((element) => {
    const {location: {lat, lng}} = element;
    const similarMarker = L.marker([lat, lng], {icon: similarMarkerIcon});
    similarMarker.addTo(mapCanvas);
    similarMarker.bindPopup(createCard(element));
  });
};

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng(DEFAULT_VIIEW);
  mapCanvas.setView(DEFAULT_VIIEW, 10);
  mapCanvas.closePopup();
  address.value = DEFAULT_VIIEW; // не работает
});

export { renderCards };
