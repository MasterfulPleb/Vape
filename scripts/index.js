console.log("Vape Shit 0.1.0 initiated")

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

var calcFlavorCount = 0
function addFlavor() {
    calcFlavorCount++
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
}
function removeFlavor () {
    var removeFlavor = document.getElementById("calcNewFlavor" + calcFlavorCount)
    removeFlavor.parentNode.removeChild(removeFlavor)
    var resultsRemoveFlavor = document.getElementById("calcResultFlavor" + calcFlavorCount)
    resultsRemoveFlavor.parentNode.removeChild(resultsRemoveFlavor)
    calcFlavorCount--
}
addFlavor()