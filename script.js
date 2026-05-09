// Title config

const config = {
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

// Title Spin

const setup = () => {
  const container = getPrizeText();
  if (!container) return;
  container.innerHTML = ""; 
  
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


// ==========================================
// 3. BOTTOM FOOTER SCROLLER (WIDTH SYNC)
// ==========================================
const initScroller = () => {
  const scroller = document.getElementById('master-container-scroller');
  const items = document.querySelectorAll('.master-container-scroller_item');
  if (!scroller || !items.length) return;

  const totalItems = items.length;
  
  // MATCH THE NEW CSS TIMING: 
  // 30 seconds total divided by 10 scrolling steps = 3000ms per word
  const timePerItem = 3000; 
  
  // Measure and set the initial word's width immediately on page load
  const firstWidth = items[0].querySelector('span').offsetWidth;
  scroller.style.width = firstWidth + 'px';

  let currentIndex = 0;

  setInterval(() => {
    // We increment index BEFORE pulling the width to remain in perfect sync
    currentIndex = (currentIndex + 1) % totalItems;
    const activeItem = items[currentIndex];
    const nextWidth = activeItem.querySelector('span').offsetWidth;
    
    scroller.style.width = nextWidth + 'px';
  }, timePerItem);
};


// ==========================================
// 4. CLEAN ONLOAD ORCHESTRATION
// ==========================================
// Change 'load' to 'DOMContentLoaded'
window.addEventListener('DOMContentLoaded', () => {
  // Init Header Spinner Loop
  setup(); 
  setTimeout(handleToggle, 200); 
  setInterval(handleToggle, config.holdTime + config.transitionDuration + 1000);

  // Init Bottom Panel Scroller Loop
  initScroller();
});