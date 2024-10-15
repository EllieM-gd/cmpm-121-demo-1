import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My empty game";
document.title = gameName;

//Declare number for counter
let counter: number = 0;

function handleEvent(event) {
    if (event.type === "click") {
      counter += 1
      updateText()
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
updateText()
//Function to update the text on the screen.
function updateText() {
    //Get any existing version of this text
    const existingDiv = app.querySelector("div");
    //Delete if it exists
    if (existingDiv){
        app.removeChild(existingDiv);
    }
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(`${counter} Fish! 🎣`);
    newDiv.appendChild(newContent);
    app.append(newDiv);
}

