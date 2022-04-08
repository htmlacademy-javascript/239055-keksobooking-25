const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/keksobooking/dat')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  });
};

export { sendData, getData };
