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
    newInput.id = "f" + calcFlavorCount
    newInput.type = "text"
    newInput.placeholder = "Flavor " + calcFlavorCount
    var newFlavorPercentInput = document.createElement("input")
    newFlavorPercentInput.className = "calcNewFlavorP"
    newFlavorPercentInput.id = "fp" + calcFlavorCount
    newFlavorPercentInput.type = "text"
    var newP = document.createElement("p")
    newP.className = "calcNewFlavorSign"
    newP.id = "calcNewFlavorPP" + calcFlavorCount
    newP.innerText = "%"
    newFlavor.appendChild(newInput)
    newFlavor.appendChild(newFlavorPercentInput)
    newFlavor.appendChild(newP)
    document.getElementById("calcFlavors").appendChild(newFlavor)
}
function removeFlavor () {
    var removeFlavor = document.getElementById("calcNewFlavor" + calcFlavorCount)
    removeFlavor.parentNode.removeChild(removeFlavor)
    calcFlavorCount--
}
addFlavor()