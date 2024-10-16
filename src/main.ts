import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fish Game";
document.title = gameName;

//Declare number for counter
let counter: number = 0;
let nets: number = 0;
const netValue: number = 0.1;
let netButtonEnabled: boolean = false;
let baits: number = 0;
const baitValue: number = 2;
let baitButtonEnabled: boolean = false;
let crewmates: number = 0;
const crewValue: number = 50;
let crewButtonEnabled: boolean = false;
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
//Display Area
const newDiv3 = document.createElement("div3");
newDiv3.style.position = "absolute"; // Allow positioning the element
newDiv3.style.top = "20px"; // Move it 20px from the right edge
newDiv3.style.right = "50px";
app.append(newDiv3);

const globalInvText = document.createTextNode("");
newDiv3.append(globalInvText);
function updateInvText() {
  if (nets == 0 && baits == 0 && crewmates == 0) return;
  globalInvText.textContent = "";
  if (nets > 0) globalInvText.textContent = "Nets - " + nets;
  if (baits > 0) globalInvText.textContent += " | Bait - " + baits;
  if (crewmates > 0) globalInvText.textContent += " | Crew - " + crewmates;
}

//Net Button
let netButtonGlob: HTMLButtonElement | undefined;
function handleNetButton() {
  //If Button has been used before we will disable and reenable it based on current fish count
  if (netButtonGlob) {
    if (counter < 10 && netButtonGlob.disabled == false) {
      netButtonGlob.disabled = true;
    } else if (counter >= 10) netButtonGlob.disabled = false;
  } else {
    //Otherwise create the button
    const netButton = document.createElement("button");
    netButton.textContent = "Net - 10 Fish";
    netButton.addEventListener("click", purchaseNetButton);
    newDiv2.appendChild(netButton);
    app.appendChild(newDiv2);
    netButtonGlob = netButton;
    netButtonEnabled = true;
  }
}

//Net Button
let baitButtonGlob: HTMLButtonElement | undefined;
function handleBaitButton() {
  //If Button has been used before we will disable and reenable it based on current fish count
  if (baitButtonGlob) {
    if (counter < 100 && baitButtonGlob.disabled == false) {
      baitButtonGlob.disabled = true;
    } else if (counter >= 100) baitButtonGlob.disabled = false;
  } else {
    //Otherwise create the button
    const baitButton = document.createElement("button");
    baitButton.textContent = "Bait - 100 Fish";
    baitButton.addEventListener("click", purchaseBaitButton);
    newDiv2.appendChild(baitButton);
    app.appendChild(newDiv2);
    baitButtonGlob = baitButton;
    baitButtonEnabled = true;
  }
}
function purchaseBaitButton(event: Event) {
  if (event.type === "click") {
    if (counter >= 100) {
      counter -= 100;
      baits += 1;
    }
  }
}

//Net Button
let crewButtonGlob: HTMLButtonElement | undefined;
function handleCrewButton() {
  //If Button has been used before we will disable and reenable it based on current fish count
  if (crewButtonGlob) {
    if (counter < 1000 && crewButtonGlob.disabled == false) {
      crewButtonGlob.disabled = true;
    } else if (counter >= 1000) crewButtonGlob.disabled = false;
  } else {
    //Otherwise create the button
    const crewButton = document.createElement("button");
    crewButton.textContent = "Crewmate - 1000 Fish";
    crewButton.addEventListener("click", purchaseCrewButton);
    newDiv2.appendChild(crewButton);
    app.appendChild(newDiv2);
    crewButtonGlob = crewButton;
    crewButtonEnabled = true;
  }
}
function purchaseCrewButton(event: Event) {
  if (event.type === "click") {
    if (counter >= 1000) {
      counter -= 1000;
      crewmates += 1;
    }
  }
}

function purchaseNetButton(event: Event) {
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
  const cost = calculateCost();
  const newContent = document.createTextNode(
    `${formatCounter} Fish! 🎣 ${cost}Fish/sec`
  );
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
  if (baitButtonEnabled == true || counter >= 100) {
    handleBaitButton();
  }
  if (crewButtonEnabled == true || counter >= 1000) {
    handleCrewButton();
  }
  const currentTime = performance.now();
  const deltaTime = currentTime - saveLastTime;
  //Calculate Cost
  const cost = calculateCost();
  counter += (cost * deltaTime) / 1000;
  updateText();
  updateInvText();
  saveLastTime = performance.now();
  requestAnimationFrame(autoClicker);
}

function calculateCost() {
  let value: number = 0;
  value += nets * netValue;
  value += baits * baitValue;
  value += crewmates * crewValue;
  return value;
}
