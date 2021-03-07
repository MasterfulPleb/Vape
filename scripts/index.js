console.log("Vape Shit 0.1.0 initiated")


//  view switching
var views = []
let viewElements = document.getElementById("views").children;
for (let i = 0; i < viewElements.length; i++) {
    views.push(viewElements[i].id)
}
function switchView(viewsId) {
    for (let i = 0; i < views.length; i++) {
        document.getElementById(views[i]).style.display = viewsId == views[i] ? "block" : "none"
    }
}
console.log(views)
//  calculator functions

//  add/remove flavor
var calcFlavorCount = 0
var calcFlavorNames = ["calcFlavor0"]
var calcResultFlavorNames = ["calcResultFlavorName0"]
function addFlavor() {
    calcFlavorCount++

    //  add flavor 
    var newFlavor = document.createElement("div")
    newFlavor.className = "calcNewFlavor"
    newFlavor.id = "calcNewFlavor" + calcFlavorCount
    var newInput = document.createElement("input")
    newInput.className = "calcNewFlavorName"
    newInput.id = "calcFlavor" + calcFlavorCount
    newInput.type = "text"
    newInput.placeholder = "Flavor " + calcFlavorCount
    var newFlavorPercentInput = document.createElement("input")
    newFlavorPercentInput.className = "calcNewFlavorP"
    newFlavorPercentInput.id = "calcFlavorPercent" + calcFlavorCount
    newFlavorPercentInput.type = "text"
    var newP = document.createElement("p")
    newP.className = "calcNewFlavorSign"
    newP.innerText = "%"
    newFlavor.appendChild(newInput)
    newFlavor.appendChild(newFlavorPercentInput)
    newFlavor.appendChild(newP)
    document.getElementById("calcFlavors").appendChild(newFlavor)

    //  add result flavor
    var resultsNewFlavor = document.createElement("div")
    resultsNewFlavor.className = "calcResultRow"
    resultsNewFlavor.id = "calcResultFlavor" + calcFlavorCount
    var resultsNewP1 = document.createElement("p")
    resultsNewP1.className = "calcResultFlavor"
    resultsNewP1.id = "calcResultFlavorName" + calcFlavorCount
    resultsNewP1.innerText = "Flavor " + calcFlavorCount
    var resultsNewP2 = document.createElement("p")
    resultsNewP2.className = "calcResultVolume"
    resultsNewP2.id = "calcResultFlavorVolume" + calcFlavorCount
    resultsNewP2.innerText = 0
    var resultsNewP3 = document.createElement("p")
    resultsNewP3.className = "calcResultMass"
    resultsNewP3.id = "calcResultFlavorMass" + calcFlavorCount
    resultsNewP3.innerText = 0
    var resultsNewP4 = document.createElement("p")
    resultsNewP4.className = "calcResultPercent"
    resultsNewP4.id = "calcResultFlavorPercent" + calcFlavorCount
    resultsNewP4.innerText = 0
    resultsNewFlavor.appendChild(resultsNewP1)
    resultsNewFlavor.appendChild(resultsNewP2)
    resultsNewFlavor.appendChild(resultsNewP3)
    resultsNewFlavor.appendChild(resultsNewP4)
    document.getElementById("calcResult").appendChild(resultsNewFlavor)

    //  result flavor name auto-update
    let calcCurrentFlavor = document.getElementById(newInput.id)
    calcFlavorNames.push(calcCurrentFlavor.id)
    let calcCurrentResultFlavor = document.getElementById(resultsNewP1.id)
    calcResultFlavorNames.push(calcCurrentResultFlavor.id)
}
function removeFlavor () {
    //  remove flavor
    var removeFlavor = document.getElementById("calcNewFlavor" + calcFlavorCount)
    removeFlavor.parentNode.removeChild(removeFlavor)

    //  remove result flavor
    var resultsRemoveFlavor = document.getElementById("calcResultFlavor" + calcFlavorCount)
    resultsRemoveFlavor.parentNode.removeChild(resultsRemoveFlavor)

    // remove flavor from array
    calcFlavorNames.length = calcFlavorCount
    calcResultFlavorNames.length = calcFlavorCount
    calcFlavorCount--
}
addFlavor()

const calcTop = document.getElementById("calcTop")
const calcFlavors = document.getElementById("calcFlavors")
const calcPG = document.getElementById("calcPG")
const calcVG = document.getElementById("calcVG")
const calcBasePG = document.getElementById("calcBasePG")
const calcBaseVG = document.getElementById("calcBaseVG")

calcPG.addEventListener("change", () => {
    calcVG.value = "100" - calcPG.value 
})
calcVG.addEventListener("change", () => {
    calcPG.value = "100" - calcVG.value 
})
calcBasePG.addEventListener("change", () => {
    calcBaseVG.value = "100" - calcBasePG.value
})
calcBaseVG.addEventListener("change", () => {
    calcBasePG.value = "100" - calcBaseVG.value
})
calcFlavors.addEventListener("change", () => {
    for (let i = 1; i < calcFlavorCount + 1; i++) {
        let flavor = document.getElementById(calcFlavorNames[i]).value
        if (flavor == "") {
            document.getElementById(calcResultFlavorNames[i]).innerHTML = "Flavor " + i
        } else {
            document.getElementById(calcResultFlavorNames[i]).innerHTML = flavor
        }
    }
})
calcTop.addEventListener("change", () => {
    document.getElementById("calcResultBaseVolume").innerText = "7"
})

/* when flavor added have it add the event listener, when removed, remove it. 
reference individual flavor update function*/