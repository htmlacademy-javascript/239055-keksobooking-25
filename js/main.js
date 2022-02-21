function getRandomInt (min, max) {
  if (min < 0 || min >= max) {
    return 'Неправильные аргументы';
  }
  return Math.round(Math.random() * (max - min) + min);
}

getRandomInt(1, 3);

function getRandomFloat (min, max, decimal) {
  if (min < 0 || min >= max || decimal < 0) {
    return 'Неправильные аргументы';
  }
  return (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomFloat(1, 3, -1);
