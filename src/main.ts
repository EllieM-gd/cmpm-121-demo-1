import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fish Game";
document.title = gameName;

//Declare number for counter
let counter: number = 0;
const nets: number = 2;
const netValue: number = 1;
//Start the check for autoclicks
//setInterval(autoClicker, 1000);
requestAnimationFrame(autoClicker);
//Event Handler for clicking
function handleEvent(event: Event) {
  if (event.type === "click") {
    counter += 1;
    updateText();
  }
}

//Header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Button
const button = document.createElement("button");
button.textContent = "🐟";
button.addEventListener("click", handleEvent);
app.appendChild(button);

//Run Once On Run
updateText();
//Function to update the text on the screen.
function updateText() {
  //Get any existing version of this text
  const existingDiv = app.querySelector("div");
  //Delete if it exists
  if (existingDiv) {
    app.removeChild(existingDiv);
  }
  const formatCounter = counter.toFixed(2);
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(`${formatCounter} Fish! 🎣`);
  newDiv.appendChild(newContent);
  app.append(newDiv);
}

let saveLastTime: number | undefined;
function autoClicker() {
  if (saveLastTime === undefined) {
    saveLastTime = performance.now();
  }
  const currentTime = performance.now();
  const deltaTime = currentTime - saveLastTime;
  counter += (nets * netValue * deltaTime) / 1000;
  updateText();
  saveLastTime = performance.now();
  requestAnimationFrame(autoClicker);
}
