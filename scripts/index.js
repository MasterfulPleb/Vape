console.log("Vape Shit 0.1.0 initiated")


//  view switching
let views = Array.from(document.getElementById("views").children)
function switchView(viewsId) {
    views.forEach(view => view.style.display = viewsId == view.id ? "block" : "none")
}


//  calculator functionality

let calcFlavorCount = 0
/** @type {Array<HTMLElement>} */
let calcFlavorList = []
/** @type {Array<HTMLElement>} */
let calcResultFlavorList = []
function addFlavor() {
    calcFlavorCount++

    //  add flavor 
    let newFlavor = document.getElementById("calcFlavors").appendChild(document.createElement("div"))
    newFlavor.id = "calcNewFlavor" + calcFlavorCount
    newFlavor.className = "calcNewFlavor"
    let newInput = newFlavor.appendChild(document.createElement("input"))
    newInput.id = "calcFlavor" + calcFlavorCount
    newInput.className = "calcNewFlavorName"
    newInput.type = "text"
    newInput.placeholder = "Flavor " + calcFlavorCount
    let newPercentInput = newFlavor.appendChild(document.createElement("input"))
    newPercentInput.id = "calcFlavorPercent" + calcFlavorCount
    newPercentInput.className = "calcNewFlavorP"
    newPercentInput.type = "number"
    newPercentInput.step = ".1"
    newPercentInput.min = "0"
    newPercentInput.max = "100"
    let newP = newFlavor.appendChild(document.createElement("p"))
    newP.className = "calcNewFlavorSign"
    newP.innerText = "%"
    
    //  add result flavor
    let resultsNewFlavor = document.getElementById("calcResult").appendChild(document.createElement("div"))
    resultsNewFlavor.id = "calcResultFlavor" + calcFlavorCount
    resultsNewFlavor.className = "calcResultRow"
    let resultsFlavorName = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsFlavorName.id = "calcResultFlavorName" + calcFlavorCount
    resultsFlavorName.className = "calcResultFlavor"
    resultsFlavorName.innerText = "Flavor " + calcFlavorCount
    let resultsVolume = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsVolume.id = "calcResultFlavorVolume" + calcFlavorCount
    resultsVolume.className = "calcResultVolume"
    resultsVolume.innerText = 0
    let resultsMass = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsMass.id = "calcResultFlavorMass" + calcFlavorCount
    resultsMass.className = "calcResultMass"
    resultsMass.innerText = 0
    let resultsPercent = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsPercent.id = "calcResultFlavorPercent" + calcFlavorCount
    resultsPercent.className = "calcResultPercent"
    resultsPercent.innerText = 0

    //  add event listener for flavor name/%
    newInput.onchange = () => {
        if (newInput.value == "") {
            resultsFlavorName.innerHTML = "Flavor " + i
        } else {
            resultsFlavorName.innerHTML = newInput.value
        }
    }
    newPercentInput.onchange = () => {
        if (newPercentInput.value == "") {
            resultsPercent.innerHTML = "0"
        } else {
            resultsPercent.innerHTML = newPercentInput.value
        }
    }

    //  add flavor to array
    calcFlavorList.push(newFlavor)
    calcResultFlavorList.push(resultsNewFlavor)
}
function removeFlavor() {
    //  remove flavor
    let removeFlavor = document.getElementById("calcNewFlavor" + calcFlavorCount)
    removeFlavor.parentNode.removeChild(removeFlavor)

    //  remove result flavor
    let removeResultFlavor = document.getElementById("calcResultFlavor" + calcFlavorCount)
    removeResultFlavor.parentNode.removeChild(removeResultFlavor)

    //  increment flavor count
    calcFlavorCount--

    //  remove flavor from array
    calcFlavorList.length = calcFlavorCount
    calcResultFlavorList.length = calcFlavorCount
}
addFlavor()

const calcAmmount = document.getElementById("calcAmmount")
const calcStrength = document.getElementById("calcStrength")
const calcPG = document.getElementById("calcPG")
const calcVG = document.getElementById("calcVG")
const calcBaseStrength = document.getElementById("calcBaseStrength")
const calcBasePG = document.getElementById("calcBasePG")
const calcBaseVG = document.getElementById("calcBaseVG")

calcPG.onchange = () => calcVG.value = "100" - calcPG.value
calcVG.onchange = () => calcPG.value = "100" - calcVG.value
calcBasePG.onchange = () => calcBaseVG.value = "100" - calcBasePG.value
calcBaseVG.onchange = () => calcBasePG.value = "100" - calcBaseVG.value
document.getElementById("calcFlavors").onchange = updateCalc
document.getElementById("calcTopLeft").onchange = updateCalc

function updateCalc() {
    document.getElementById("calcResultBaseVolume").innerText = "7"
}