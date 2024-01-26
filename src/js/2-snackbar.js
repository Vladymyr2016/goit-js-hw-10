import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
console.log(inputDelay);

const inputFulfilled = document.querySelector('[name="state" ]');
const submitBtn = document.querySelector('button');

function generatePromise(delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(
      delay => {
        if (
          inputFulfilled.value === 'fulfilled' ||
          inputFulfilled.checked === true
        ) {
          resolve(`✅ Fulfilled promise in ${delay} ms`);
        } else {
          reject(`❌ Rejected promise in ${delay} ms`);
        }
      },
      delay,
      delay
    );
  });

  return promise;
}

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();
  const inputDelay = document.querySelector('[name="delay"]');
  const delay = parseInt(inputDelay.value, 10);
  generatePromise(delay)
    .then(message => {
      iziToast.show({
        color: 'green',
        position: 'center',
        message: message,
      });
    })
    .catch(error => {
      iziToast.show({
        color: 'red',
        position: 'center',
        message: error,
      });
    });
  form.reset();
}
