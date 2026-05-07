const config = {
  // IMPORTANT: Ensure both strings are exactly the same length! 
  // Add spaces to pad them if necessary.
  text1: "SHUBHAM  KUMAR", // Replace with your 14-char name
  text2: "GAME DEVELOPER", 
  transitionDuration: 3000,
  spins: 2, // How many full alphabet loops it makes before stopping
};

// We include a space at the end of our alphabet array so empty slots render correctly
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("");

let isShowingText1 = true;

const getPrizeText = () => document.getElementById("prize-text");
const getTracks = () => document.querySelectorAll(".digit > .digit-track");

const setup = () => {
  const container = getPrizeText();
  container.innerHTML = ""; 

  // Create exactly 14 track containers
  for (let i = 0; i < config.text1.length; i++) {
    const digitElement = document.createElement("span");
    digitElement.className = "digit";

    const trackElement = document.createElement("span");
    trackElement.className = "digit-track";

    digitElement.appendChild(trackElement);
    container.appendChild(digitElement);
  }

  // Initialize tracks with your Name
  buildTracks(config.text1);
};

const buildTracks = (startingText) => {
  getTracks().forEach((track, index) => {
    let trackChars = [startingText[index].toUpperCase()];
    
    // Add random spinning letters
    for (let j = 0; j < config.spins; j++) {
      trackChars = trackChars.concat(ALPHABET);
    }
    // Add one final alphabet sequence so we can land on the correct target letter
    trackChars = trackChars.concat(ALPHABET);

    // Map characters to 6rem divs to perfectly match the CSS height, using &nbsp; for spaces
    track.innerHTML = trackChars.map(c => 
      `<div style="height: 6rem; display: flex; align-items: center; justify-content: center;">
        ${c === ' ' ? '&nbsp;' : c}
      </div>`
    ).join("");

    // Reset translation instantly so it's ready to roll again
    track.style.transitionDuration = "0ms";
    track.style.translate = "0rem 0rem";
  });
};

const animateTo = (targetText) => {
  getTracks().forEach((track, index) => {
    const targetChar = targetText[index].toUpperCase();
    const charIndexInAlphabet = ALPHABET.indexOf(targetChar);

    // Calculate how many 6rem blocks we need to scroll past
    const itemsToScroll = 1 + (config.spins * ALPHABET.length) + charIndexInAlphabet;

    // Force DOM reflow so the transition animation actually triggers
    track.offsetHeight; 
    track.style.transitionDuration = `${config.transitionDuration}ms`;

    // Translate Y: -6rem per character block
    track.style.translate = `0rem ${itemsToScroll * -6}rem`;
  });
};

// The toggle function called by the button
const handleToggle = () => {
  const currentText = isShowingText1 ? config.text1 : config.text2;
  const targetText = isShowingText1 ? config.text2 : config.text1;

  // Rebuild the tracks starting from the current visual text
  buildTracks(currentText);

  // Trigger the roll to the new text after a tiny delay
  setTimeout(() => animateTo(targetText), 50);

  isShowingText1 = !isShowingText1;
};

// Original Theme Logic
const updateTheme = theme => {
  document.documentElement.style.setProperty("--theme-rgb", `var(--${theme})`);
  for(const button of document.querySelectorAll(".theme-button")) {
    button.dataset.selected = theme === button.dataset.theme;
  }
}
const handleChangeTheme = e => updateTheme(e.currentTarget.dataset.theme);

window.onload = () => {
  setup();
  updateTheme("green");
  
  // Optional: Automatically trigger the first roll 1 second after page load
  setTimeout(() => handleToggle(), 1000); 
};