import {arrayCards} from './fillingCards.js';

const map = document.querySelector('#map-canvas');

const renderCard = (i = 'undefined') => {
  if (i === 'undefined') {
    arrayCards.forEach((element) => {
      map.appendChild(element);
    });
  } else {
    map.appendChild(arrayCards[i]);
  }
};

export {renderCard};
