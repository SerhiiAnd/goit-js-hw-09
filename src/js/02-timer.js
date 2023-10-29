import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    if (selectedDate < Date.now()) {
      alert('Please choose a date in the future');
    } else {
      const startButton = document.querySelector('[data-start]');
      startButton.disabled = false;

      startButton.addEventListener('click', () => {
        const currentDate = Date.now();
        if (selectedDate > currentDate) {
          startTimer(selectedDate);
        }
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer(selectedDate) {
  const timer = document.querySelector('.timer');
  const fields = {
    days: timer.querySelector('[data-days]'),
    hours: timer.querySelector('[data-hours]'),
    minutes: timer.querySelector('[data-minutes]'),
    seconds: timer.querySelector('[data-seconds]'),
  };

  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const currentDate = Date.now();
    const difference = selectedDate - currentDate;

    if (difference <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    fields.days.textContent = addLeadingZero(days);
    fields.hours.textContent = addLeadingZero(hours);
    fields.minutes.textContent = addLeadingZero(minutes);
    fields.seconds.textContent = addLeadingZero(seconds);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
