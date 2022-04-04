const showDataErrorMessage = () => {
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
  message.textContent = 'Не удалось загрузить данные. Попробуйте обновить страницу';
  messageContainer.append(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  showDataErrorMessage,
  isEscapeKey
};

