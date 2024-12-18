import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fishing Game";
document.title = gameName;

//Declare number for playerFishCount
let playerFishCount: number = 0;
const purchaseMultiplier: number = 1.15;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  enabled: boolean;
  buttonReference: HTMLButtonElement;
  description: string;
}
const netsButton = document.createElement("button");
const rodButton = document.createElement("button");
const crewButton = document.createElement("button");
const fishFinderButton = document.createElement("button");
const baitButton = document.createElement("button");
const upgradeShip = document.createElement("button");
const petSharkButton = document.createElement("button");

const ItemHandler: Item[] = [
  {
    name: "Nets",
    cost: 10,
    rate: 0.2,
    count: 0,
    enabled: false,
    buttonReference: netsButton,
    description: "A net to catch fish with passively",
  },
  {
    name: "Rod Upgrade",
    cost: 75,
    rate: 0,
    count: 0,
    enabled: false,
    buttonReference: rodButton,
    description: "Catch more fish per click",
  },
  {
    name: "Bait",
    cost: 100,
    rate: 2,
    count: 0,
    enabled: false,
    buttonReference: baitButton,
    description: "Bring more fish to you with *Bait*!",
  },
  {
    name: "Fish Finder",
    cost: 500,
    rate: 25,
    count: 0,
    enabled: false,
    buttonReference: fishFinderButton,
    description: "A Radar that leads you towards more fish",
  },
  {
    name: "Crewmate",
    cost: 1000,
    rate: 50,
    count: 0,
    enabled: false,
    buttonReference: crewButton,
    description: "A little help goes a long way",
  },
  {
    name: "Upgrade Ship",
    cost: 5000,
    rate: 100,
    count: 0,
    enabled: false,
    buttonReference: upgradeShip,
    description: "Manuever faster to find more fish!",
  },
  {
    name: "Pet Shark",
    cost: 20000,
    rate: 200,
    count: 0,
    enabled: false,
    buttonReference: petSharkButton,
    description: "This shark is trained to hunt fish and return them to you",
  },
];

//Function to update the text on the screen.
function updateText() {
  //Get any existing version of this text
  const existingDiv = app.querySelector("div");
  //Delete if it exists
  if (existingDiv) {
    app.removeChild(existingDiv);
  }
  const newDiv = document.createElement("div");
  const cost = calculateCost();
  const newContent = document.createTextNode(
    `${playerFishCount.toFixed(2)} Fish! 🐟 ${cost.toFixed(1)}Fish/sec`,
  );
  newDiv.appendChild(newContent);
  app.append(newDiv);
}
//Run Once On Run
updateText();

//Start the check for autoclicks
//setInterval(autoClicker, 1000);
requestAnimationFrame(autoClicker);

//Header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
//Button
const fishCollectButton = document.createElement("button");
fishCollectButton.textContent = "🎣";
fishCollectButton.addEventListener("click", function (event) {
  if (event.type === "click") {
    playerFishCount += 1 + ItemHandler[1].count / 2;
    updateText();
  }
});
app.appendChild(fishCollectButton);
//Shop Area
const htmlDiv2 = document.createElement("div2");
htmlDiv2.style.position = "absolute"; // Allow positioning the element
htmlDiv2.style.right = "20px"; // Move it 20px from the right edge
htmlDiv2.style.top = "50px"; // Move it 50px from the top
//Display Area
const htmlDiv3 = document.createElement("div3");
htmlDiv3.style.position = "absolute"; // Allow positioning the element
htmlDiv3.style.top = "20px"; // Move it 20px from the right edge
htmlDiv3.style.right = "50px";
app.append(htmlDiv3);

const globalInvText = document.createTextNode("");
htmlDiv3.append(globalInvText);
function updateInvText() {
  globalInvText.textContent = "";
  let isFirstInInv: boolean = true;
  for (let i = 0; i < ItemHandler.length; i++) {
    if (ItemHandler[i].count > 0) {
      if (!isFirstInInv) globalInvText.textContent += "|";
      globalInvText.textContent += ` ${ItemHandler[i].name} - ${ItemHandler[i].count} `;
      isFirstInInv = false;
    }
  }
}

//Append div where shop is
app.appendChild(htmlDiv2);

function setupButton(itemReference: Item, index: number) {
  itemReference.buttonReference.textContent = `${itemReference.name} - ${itemReference.cost.toFixed(0)} 🐟\n ${itemReference.rate}/sec`;
  //Description declaration
  const descriptionText = document.createElement("desc");
  descriptionText.textContent = itemReference.description;
  descriptionText.style.position = "absolute";
  descriptionText.hidden = true;
  document.body.appendChild(descriptionText);
  //Add Event Listeners --------
  //On click attempt to purchase item
  itemReference.buttonReference.addEventListener("click", function (event) {
    purchaseButton(event, index);
  });
  // Hide and Show description based on if its inside the button or not
  itemReference.buttonReference.addEventListener("mouseenter", function () {
    descriptionText.hidden = false;
  });
  itemReference.buttonReference.addEventListener("mouseleave", function () {
    descriptionText.hidden = true;
  });
  // Track Mouse for Description location only when hovering the button
  itemReference.buttonReference.addEventListener("mousemove", function (event) {
    if (!descriptionText.hidden) {
      descriptionText.style.left = event.pageX + 10 + "px";
      descriptionText.style.top = event.pageY + 10 + "px";
    }
  });

  htmlDiv2.appendChild(itemReference.buttonReference);
  itemReference.enabled = true;
}

function handleBuyButtons(index: number) {
  //If Button has been used before we will disable and reenable it based on current fish count
  if (ItemHandler[index].enabled) {
    if (
      playerFishCount < ItemHandler[index].cost &&
      ItemHandler[index].buttonReference.disabled === false
    ) {
      ItemHandler[index].buttonReference.disabled = true;
    } else if (playerFishCount >= ItemHandler[index].cost)
      ItemHandler[index].buttonReference.disabled = false;
  } else {
    //Otherwise create the button
    setupButton(ItemHandler[index], index);
  }
}

function purchaseButton(event: Event, index: number) {
  if (event.type === "click") {
    if (playerFishCount >= ItemHandler[index].cost) {
      playerFishCount -= ItemHandler[index].cost;
      ItemHandler[index].count += 1;
      ItemHandler[index].cost *= purchaseMultiplier;
      ItemHandler[index].buttonReference.textContent =
        `${ItemHandler[index].name} - ${ItemHandler[index].cost.toFixed(0)} 🐟\n ${ItemHandler[index].rate}/sec`;
    }
  }
}

let saveLastTime: number | undefined;
function autoClicker() {
  if (saveLastTime === undefined) {
    saveLastTime = performance.now();
  }
  //Handle buttons. Mostly used to check if player has enough money to purchase and then enables/disables
  for (let i = 0; i < ItemHandler.length; i++) {
    if (
      ItemHandler[i].enabled === true ||
      playerFishCount >= ItemHandler[i].cost
    ) {
      handleBuyButtons(i);
    }
  }
  //Handle time between frames
  const deltaTime = performance.now() - saveLastTime;
  //Calculate Cost
  const cost = calculateCost();
  playerFishCount += (cost * deltaTime) / 1000;
  //Update Text on screen
  updateText();
  updateInvText();
  //Save Time
  saveLastTime = performance.now();
  //Run Again next frame
  requestAnimationFrame(autoClicker);
}

function calculateCost(): number {
  let returnCost: number = 0;
  for (let p = 0; p < ItemHandler.length; p++) {
    returnCost += ItemHandler[p].count * ItemHandler[p].rate;
  }
  return returnCost;
}
