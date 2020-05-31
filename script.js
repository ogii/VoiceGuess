const msgEl = document.getElementById('msg');

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// Display what the user says
const writeMessage = (msg) => {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
};

// Check the message against number
const checkNumber = (msg) => {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML = "<div>That is not a valid number</div>";
    return;
  }

  // Check if the number is in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
  }

  // Check the number
  if (num === randomNumber) {
    document.body.innerHTML = `
    <h2>Congrats. You have correctly guessed the number <br><br>
    It was ${num}
    </h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNumber) {
    msgEl.innerHTML += '<div>Go Lower</div>';
  } else {
    msgEl.innerHTML += '<div>Go Higher</div>';
  }

};

// Capture what the user says
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
};

const randomNumber = getRandomNumber();

console.log('Number: ' + randomNumber);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start speech recognition and the game
recognition.start();

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});