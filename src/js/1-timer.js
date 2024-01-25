import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minValue = document.querySelector('[data-minutes]');
const secValue = document.querySelector('[data-seconds]');
class Timer {
  constructor(convertMs, selectedDates) {
    this.intervalId = null;
    this.collectTime = convertMs;
  }
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.selectedDates - Date.now();
      daysValue.textContent = padStart(this.collectTime(diff).days);

      hoursValue.textContent = this.collectTime(diff).hours;
      minValue.textContent = this.collectTime(diff).minutes;
      secValue.textContent = this.collectTime(diff).seconds;
    }, 1000);
  }
  cleanInterval() {
    clearInterval(this.intervalId);
  }
}

startBtn.addEventListener('click', () => {
  timer.start();
});

function padStart(number) {
  return number.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.selectedDates = selectedDates[0];
    if (timer.selectedDates < Date.now()) {
      startBtn.disabled = true;
      iziToast.show({
        title: 'Hey',
        message: 'Please choose a date in the future',
      });
      console.log(iziToast);
    } else {
      startBtn.disabled = false;
    }
  },
};

const input = document.querySelector('#datetime-picker');
const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timer = new Timer(convertMs);
