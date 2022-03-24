import { switchForm } from './switchForm.js';
import { createAds } from './createAds.js';
import { renderCard } from './renderCard.js';

const DEFAULT_VIIEW = [35.6895, 139.69171];
const DECIMAL = 5;
const ads = createAds();
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
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});
const mainMarker = L.marker(DEFAULT_VIIEW, {draggable: true, icon: mainMarkerIcon});
mainMarker.addTo(mapCanvas);

mainMarker.on('moveend', () => {
  const position = mainMarker.getLatLng();
  address.value = `${position.lat.toFixed(DECIMAL)}, ${position.lng.toFixed(DECIMAL)}`;
});

const similarMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

ads.forEach((element) => {
  const {location: {lat, lng}} = element;
  const similarMarker = L.marker([lat, lng], {icon: similarMarkerIcon});
  similarMarker.addTo(mapCanvas);
  similarMarker.bindPopup(renderCard(element));
});

