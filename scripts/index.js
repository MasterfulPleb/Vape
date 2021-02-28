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

var fc = 0

function addFlavor() {
    fc += 1
    var newFlavor = document.createElement("div")
    var newInput = document.createElement("input")
    var newFlavorPI = document.createElement("input")
    var newP = document.createElement("p")
    newFlavor.className = "calcNewFlavor"
    newFlavor.id = "calcNewFlavor" + fc
    document.getElementById("calcFlavors").appendChild(newFlavor)
    newInput.className = "calcNewFlavorName"
    newInput.id = "f" + fc
    newInput.type = "text"
    newInput.placeholder = "Flavor " + fc
    document.getElementById(newFlavor.id).appendChild(newInput)
    newFlavorPI.className = "calcNewFlavorP"
    newFlavorPI.id = "fp" + fc
    newFlavorPI.type = "text"
    document.getElementById(newFlavor.id).appendChild(newFlavorPI)
    newP.className = "calcNewFlavorSign"
    newP.id = "calcNewFlavorPP" + fc
    document.getElementById(newFlavor.id).appendChild(newP)
    document.getElementById(newP.id).innerText = "%"
}