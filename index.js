// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import confetti from 'canvas-confetti';
import { getRandomNumber } from './modules/getRandomNumber.js';
import { showNotification } from './modules/showNotification.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='guess-number'>
    <h1>🎲 Guess Number</h1>
    <ul data-output></ul>
    <form data-form>
      <label>
        <input type='text' name='guess' data-input>
      </label>
    </form>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Class
class App {
  constructor() {
    this.DOM = {
      form: document.querySelector('[data-form]'),
      input: document.querySelector('[data-input]'),
      output: document.querySelector('[data-output]'),
    };

    this.PROPS = {
      username: '',
      attemptsQuantity: 0,
      secret: getRandomNumber(1, 100),
    };

    this.DOM.input.focus();
    this.showMessage('👨 Enter your name:');
    this.DOM.form.addEventListener('submit', this.onSubmit);
    console.log(`The number that was guessed is ${this.PROPS.secret}`);
  }

  /**
   * @function onSubmit - Form submit handler
   * @param event
   */
  onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const value = form.guess.value.trim();

    if (!value) {
      showNotification('warning', 'Please fill the field.');
      return;
    }

    if (!this.PROPS.username) {
      this.PROPS.username = value;
      for (let i = 0; i < this.DOM.output.children.length; i++) this.DOM.output.removeChild(this.DOM.output.children[i]);
      this.showMessage(`👨 ${value}, there is a number between 0 and 100. Try to guess it in the fewest number of tries. After each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'`);
      this.DOM.input.value = '';
      this.DOM.input.setAttribute('type', 'number');
      return;
    }

    let guess = Number.parseInt(value);
    if (isNaN(guess)) return;

    this.showMessage(value);
    this.PROPS.attemptsQuantity++;
    if (guess > this.PROPS.secret) {
      this.showMessage('⬇️ Many. Try again 😸');
    } else if (guess < this.PROPS.secret) {
      this.showMessage('⬆️️ Few. Try again 😸');
    } else {
      this.showMessage(`🎊 Right. The number you've guessed: ${guess}`);
      this.showMessage(`🎉 Number of attempts: ${this.PROPS.attemptsQuantity}`);
      confetti({
        angle: getRandomNumber(55, 125),
        spread: getRandomNumber(50, 70),
        particleCount: getRandomNumber(50, 100),
        origin: { y: 0.6 },
      });
      form.remove();
    }
    this.DOM.input.value = '';
  };

  /**
   * @function showMessage - Show message
   * @param message
   */
  showMessage = (message) => {
    const li = document.createElement('li');
    li.innerHTML = message;
    this.DOM.output.appendChild(li);
  };
}

// ⚡️Class Instance
new App();

