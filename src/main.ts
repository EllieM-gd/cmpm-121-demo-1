import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fish Game";
document.title = gameName;

//Declare number for counter
let counter: number = 99;
const purchaseMultiplier: number = 1.15;

interface Item {
  name: string,
  cost: number,
  rate: number,
  count: number,
  enabled: boolean,
  buttonReference: HTMLButtonElement
};
const netsButton = document.createElement("button");
const crewButton = document.createElement("button");
const baitButton = document.createElement("button");



const availableItems : Item[] = [
  {name: "Nets", cost: 10, rate: 0.1, count: 0, enabled: false, buttonReference: netsButton},
  {name: "Bait", cost: 100, rate: 2, count: 0, enabled: false, buttonReference: baitButton},
  {name: "Crew", cost: 1000, rate: 50, count: 0, enabled: false, buttonReference: crewButton}
];



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
button.textContent = "🎣";
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
  globalInvText.textContent = "";
  for (let i = 0; i < availableItems.length; i++){
    if (availableItems[i].count > 0) {
      globalInvText.textContent = ` ${availableItems[i].name} - ${availableItems[i].count} `;
    }
  }
}

//Append div where shop is
app.appendChild(newDiv2);


function handleBuyButtons(index: number) {
  //If Button has been used before we will disable and reenable it based on current fish count
  if (availableItems[index].enabled) {
    if (counter < availableItems[index].cost && availableItems[index].buttonReference.disabled == false) {
      availableItems[index].buttonReference.disabled = true;
    } else if (counter >= availableItems[index].cost) availableItems[index].buttonReference.disabled = false;
  } else {
    //Otherwise create the button
    availableItems[index].buttonReference.textContent = `${availableItems[index].name} - ${availableItems[index].cost.toFixed(0)} Fish`;
    availableItems[index].buttonReference.addEventListener("click", function(event){
      purchaseButton(event, index)
    });
    newDiv2.appendChild(availableItems[index].buttonReference);
    availableItems[index].enabled = true;
  }
}

function purchaseButton(event: Event, index: number) {
  if (event.type === "click") {
    if (counter >= availableItems[index].cost) {
      counter -= availableItems[index].cost;
      availableItems[index].count += 1;
      availableItems[index].cost *= purchaseMultiplier;
      availableItems[index].buttonReference.textContent = `${availableItems[index].name} - ${availableItems[index].cost.toFixed(0)} Fish`;
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
    `${formatCounter} Fish! 🐟 ${cost.toFixed(1)}Fish/sec`,
  );
  newDiv.appendChild(newContent);
  app.append(newDiv);
}

let saveLastTime: number | undefined;
function autoClicker() {
  if (saveLastTime === undefined) {
    saveLastTime = performance.now();
  }
  //Handle buttons. Mostly used to check if player has enough money to purchase and then enables/disables
  for (let i = 0; i < availableItems.length; i++){
    if (availableItems[i].enabled == true || counter >= availableItems[i].cost){
      handleBuyButtons(i)
    }
  }
  //Handle time between frames
  const currentTime = performance.now();
  const deltaTime = currentTime - saveLastTime;
  //Calculate Cost
  const cost = calculateCost();
  counter += (cost * deltaTime) / 1000;
  //Update Text on screen
  updateText();
  updateInvText();
  //Save Time
  saveLastTime = performance.now();
  //Run Again
  requestAnimationFrame(autoClicker);
}

function calculateCost() {
  let value: number = 0;
  for (let p = 0; p < availableItems.length; p++){
    value += availableItems[p].count * availableItems[p].rate;
  }
  return value;
}
