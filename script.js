const config = {
  text1: "FIRSTNAME LAST", 
  text2: "GAME DEVELOPER", 
  transitionDuration: 2500,
  spins: 1, 
  holdTime: 4000 // Time in milliseconds to wait before switching
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
let isShowingText1 = true;

const getPrizeText = () => document.getElementById("prize-text");
const getTracks = () => document.querySelectorAll(".digit > .digit-track");

const setup = () => {
  const container = getPrizeText();
  container.innerHTML = ""; 
  for (let i = 0; i < config.text1.length; i++) {
    const digitElement = document.createElement("span");
    digitElement.className = "digit";
    const trackElement = document.createElement("span");
    trackElement.className = "digit-track";
    digitElement.appendChild(trackElement);
    container.appendChild(digitElement);
  }
  buildTracks(config.text1);
};

const buildTracks = (startingText) => {
  getTracks().forEach((track, index) => {
    let trackChars = [startingText[index].toUpperCase()];
    for (let j = 0; j < config.spins; j++) {
      trackChars = trackChars.concat(ALPHABET);
    }
    trackChars = trackChars.concat(ALPHABET);

    // Height updated to 4rem to match new CSS
    track.innerHTML = trackChars.map(c => 
      `<div style="height: 4rem; display: flex; align-items: center; justify-content: center;">
        ${c === ' ' ? '&nbsp;' : c}
      </div>`
    ).join("");

    track.style.transitionDuration = "0ms";
    track.style.translate = "0rem 0rem";
  });
};

const animateTo = (targetText) => {
  getTracks().forEach((track, index) => {
    const targetChar = targetText[index].toUpperCase();
    const charIndexInAlphabet = ALPHABET.indexOf(targetChar);
    const itemsToScroll = 1 + (config.spins * ALPHABET.length) + charIndexInAlphabet;

    track.offsetHeight; 
    track.style.transitionDuration = `${config.transitionDuration}ms`;
    track.style.translate = `0rem ${itemsToScroll * -4}rem`; // Updated to -4rem
  });
};

const handleToggle = () => {
  const currentText = isShowingText1 ? config.text1 : config.text2;
  const targetText = isShowingText1 ? config.text2 : config.text1;

  buildTracks(currentText);
  setTimeout(() => animateTo(targetText), 50);
  isShowingText1 = !isShowingText1;
};

window.onload = () => {
  setup();
  // Start the infinite loop
  setInterval(handleToggle, config.holdTime + config.transitionDuration);
};