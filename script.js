const config = {
  // All strings MUST be exactly 14 characters
  texts: [
    "DEV  PORTFOLIO", 
    "SHUBHAM  KUMAR", 
    "GAME DEVELOPER"
  ],
  transitionDuration: 4500,
  spins: 3, 
  holdTime: 3000 
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");
let currentTextIndex = 0;

const getPrizeText = () => document.getElementById("prize-text");
const getTracks = () => document.querySelectorAll(".digit > .digit-track");

const setup = () => {
  const container = getPrizeText();
  container.innerHTML = ""; 
  // Use index 0 of the array for initial setup
  for (let i = 0; i < config.texts[0].length; i++) {
    const digitElement = document.createElement("span");
    digitElement.className = "digit";
    const trackElement = document.createElement("span");
    trackElement.className = "digit-track";
    digitElement.appendChild(trackElement);
    container.appendChild(digitElement);
  }
  buildTracks(config.texts[0]);
};

const buildTracks = (startingText) => {
  getTracks().forEach((track, index) => {
    let trackChars = [startingText[index].toUpperCase()];
    for (let j = 0; j < config.spins; j++) {
      trackChars = trackChars.concat(ALPHABET);
    }
    trackChars = trackChars.concat(ALPHABET);

    // Height updated to 3.5rem to match new bigger text
    track.innerHTML = trackChars.map(c => 
      `<div style="height: 3.5rem; display: flex; align-items: center; justify-content: center;">
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
    
    const randomDelay = Math.floor(Math.random() * 1000);
    track.style.transitionDelay = `${randomDelay}ms`;
    
    // Multiplier updated to -3.5 to match new height
    track.style.translate = `0rem ${itemsToScroll * -3.5}rem`; 
  });
};

const handleToggle = () => {
  const currentText = config.texts[currentTextIndex];
  currentTextIndex = (currentTextIndex + 1) % config.texts.length;
  const targetText = config.texts[currentTextIndex];

  buildTracks(currentText);
  setTimeout(() => animateTo(targetText), 50);
};

window.onload = () => {
  setup();
  // New Card initialization (from previous steps)
  if (typeof initCards === "function") initCards(); 
  
  setTimeout(handleToggle, 200); 
  setInterval(handleToggle, config.holdTime + config.transitionDuration + 1000); // Added a small buffer for random delays
};

// ... Keep your existing config, ALPHABET, setup, buildTracks, and animateTo code ...

const initCards = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  document.querySelectorAll(".screen").forEach(card => {
    const nameElement = card.querySelector(".name");
    let interval = null;

    card.onmouseenter = () => {  
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        nameElement.innerText = nameElement.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) return nameElement.dataset.value[index];
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if(iteration >= nameElement.dataset.value.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }
  });
};

window.onload = () => {
  setup(); // Existing title bar setup
  initCards(); // New card logic setup
  
  // Existing loop logic
  setTimeout(() => handleToggle(), 200); 
  setInterval(handleToggle, config.holdTime + config.transitionDuration);
};