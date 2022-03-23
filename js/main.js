import './formValidate.js';
import { switchForm } from './switchForm.js';
import { createAds } from './createAds.js';
import { renderCard } from './renderCard.js';

const cards = createAds();

renderCard(cards[0]);
switchForm();
