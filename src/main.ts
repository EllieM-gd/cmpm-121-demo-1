import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fish Game";
document.title = gameName;

//Declare number for counter
let counter: number = 0;
let nets: number = 0;
const netValue: number = 0.2;
let netButtonEnabled: boolean = false;
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

//Shop Area
const newDiv2 = document.createElement("div2");
newDiv2.style.position = "absolute"; // Allow positioning the element
newDiv2.style.right = "20px"; // Move it 20px from the right edge
newDiv2.style.top = "50px"; // Move it 50px from the top

//Net Button
let netButtonGlob: HTMLButtonElement | undefined;
function handleNetButton() {
    //If Button has been used before we will disable and reenable it based on current fish count
  if (netButtonGlob) {
    if (counter < 10 && netButtonGlob.disabled == false) {
      netButtonGlob.disabled = true;
    } else if (counter >= 10) netButtonGlob.disabled = false;
  } else { //Otherwise create the button
    const netButton = document.createElement("button");
    netButton.textContent = "Purchase - Net - 10 Fish";
    netButton.addEventListener("click", purchaseButton);
    newDiv2.appendChild(netButton);
    app.appendChild(newDiv2);
    netButtonGlob = netButton;
    netButtonEnabled = true;
  }
}

function purchaseButton(event: Event) {
  if (event.type === "click") {
    if (counter >= 10) {
      counter -= 10;
      nets += 1;
    }
  }
}

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
  if (netButtonEnabled == true || counter >= 10) {
    handleNetButton();
  }
  const currentTime = performance.now();
  const deltaTime = currentTime - saveLastTime;
  counter += (nets * netValue * deltaTime) / 1000;
  updateText();
  saveLastTime = performance.now();
  requestAnimationFrame(autoClicker);
}
