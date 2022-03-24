import './formValidate.js';
import './priceSlider.js';
import { createAds } from './createAds.js';
import { renderCards } from './map.js';

const ads = createAds();
renderCards(ads);
