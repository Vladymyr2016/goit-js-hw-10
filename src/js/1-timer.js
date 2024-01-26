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
    this.selectedDates = selectedDates;
  }
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.selectedDates - Date.now();
      daysValue.textContent = padStart(this.collectTime(diff).days);
      hoursValue.textContent = padStart(this.collectTime(diff).hours);
      minValue.textContent = padStart(this.collectTime(diff).minutes);
      secValue.textContent = padStart(this.collectTime(diff).seconds);
      if (diff <= 0) {
        clearInterval(this.intervalId);
        daysValue.textContent = '00';
        hoursValue.textContent = '00';
        minValue.textContent = '00';
        secValue.textContent = '00';
      }
    }, 1000);
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
      startBtn.setAttribute('disabled', true);
      iziToast.show({
        color: 'red',
        position: 'center',
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
const input = document.querySelector('#datetime-picker');
flatpickr('#datetime-picker', options);
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
