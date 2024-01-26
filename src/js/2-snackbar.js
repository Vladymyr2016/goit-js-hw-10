import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');

const inputFulfilled = document.querySelector('[name="state" ]');
const submitBtn = document.querySelector('button');

const delay = inputDelay.value;

function generatePromise(delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(delay => {
      if (
        inputFulfilled.value === 'fulfilled' &&
        inputFulfilled.checked === true
      ) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  generatePromise(delay)
    .then(message => {
      iziToast.show({
        message: message,
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
      });
    });
  form.reset();
}
