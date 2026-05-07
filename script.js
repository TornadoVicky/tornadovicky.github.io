const config = {
  // IMPORTANT: Both must be the same length (14 chars)
  text1: "SHUBHAM  KUMAR", 
  text2: "GAME DEVELOPER", 
  transitionDuration: 4500, // [cite: 4]
  spins: 3, 
  holdTime: 3000 // How long to stay on a name
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

    // Height must match the #prize-text height in CSS (2.5rem)
    track.innerHTML = trackChars.map(c => 
      `<div style="height: 2.5rem; display: flex; align-items: center; justify-content: center;">
        ${c === ' ' ? '&nbsp;' : c}
      </div>`
    ).join("");

    track.style.transitionDuration = "0ms";
    track.style.transitionDelay = "0ms";
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
    // Using 2.5 to match the new height
    track.style.transitionDelay = `${index * 100}ms`;
    track.style.translate = `0rem ${itemsToScroll * -2.5}rem`; 
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
  // Trigger the first roll almost immediately
  setTimeout(handleToggle, 200); 
  
  // Start the regular loop
  setInterval(handleToggle, config.holdTime + config.transitionDuration);
};