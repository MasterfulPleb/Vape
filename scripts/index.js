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
    newP.innerHTML = "%"
    
    //  add result flavor
    let resultsNewFlavor = document.getElementById("calcResult").appendChild(document.createElement("div"))
    resultsNewFlavor.id = "calcResultFlavor" + calcFlavorCount
    resultsNewFlavor.className = "calcResultRow"
    let resultsFlavorName = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsFlavorName.id = "calcResultFlavorName" + calcFlavorCount
    resultsFlavorName.className = "calcResultFlavor"
    resultsFlavorName.innerHTML = "Flavor " + calcFlavorCount
    let resultsVolume = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsVolume.id = "calcResultFlavorVolume" + calcFlavorCount
    resultsVolume.className = "calcResultVolume"
    resultsVolume.innerHTML = "0"
    let resultsMass = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsMass.id = "calcResultFlavorMass" + calcFlavorCount
    resultsMass.className = "calcResultMass"
    resultsMass.innerHTML = "0"
    let resultsPercent = resultsNewFlavor.appendChild(document.createElement("p"))
    resultsPercent.id = "calcResultFlavorPercent" + calcFlavorCount
    resultsPercent.className = "calcResultPercent"
    resultsPercent.innerHTML = "0"

    //  add event listener for flavor name
    newInput.onchange = () => {
        if (newInput.value == "") {
            resultsFlavorName.innerHTML = "Flavor " + i
        } else {
            resultsFlavorName.innerHTML = newInput.value
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

    //  update calculator
    updateCalc()
}
addFlavor()

const calcAmmount = document.getElementById("calcAmmount")
const calcStrength = document.getElementById("calcStrength")
const calcPG = document.getElementById("calcPG")
const calcVG = document.getElementById("calcVG")
const calcBaseStrength = document.getElementById("calcBaseStrength")
const calcBasePG = document.getElementById("calcBasePG")
const calcBaseVG = document.getElementById("calcBaseVG")
const calcBase = document.getElementById("")

calcPG.onchange = () => calcVG.value = "100" - calcPG.value
calcVG.onchange = () => calcPG.value = "100" - calcVG.value
calcBasePG.onchange = () => calcBaseVG.value = "100" - calcBasePG.value
calcBaseVG.onchange = () => calcBasePG.value = "100" - calcBaseVG.value
document.getElementById("calcFlavors").onchange = updateCalc
document.getElementById("calcTopLeft").onchange = updateCalc

function updateCalc() {
    let totalFlavorPercent = 0
    calcFlavorList.forEach(flavor => {
        if (flavor.getElementsByClassName("calcNewFlavorP")[0].value == "") {
            totalFlavorPercent += 0
        } else {
            totalFlavorPercent += parseFloat(flavor.getElementsByClassName("calcNewFlavorP")[0].value)
        }
    })
    let basePGVGDensity = calcBasePG.value / 100 * 1.036 + calcBaseVG.value / 100 * 1.261
    let baseDensity = calcBaseStrength.value / 1000 * 1.01 + (1 - calcBaseStrength.value / 1000) * basePGVGDensity
    let BV = calcAmmount.value * calcStrength.value / calcBaseStrength.value
    let BM = BV * baseDensity
    let BP = 100 * BV / calcAmmount.value
    let PGV = ((calcPG.value - totalFlavorPercent) * calcAmmount.value - calcBasePG.value * BV) / 100
    let PGM = PGV * 1.036
    let PGP = 100 * PGV / calcAmmount.value
    let VGV = (calcVG.value * calcAmmount.value - calcBaseVG.value * BV) / 100
    let VGM = VGV * 1.261
    let VGP = 100 * VGV / calcAmmount.value
    document.getElementById("calcResultBaseVolume").innerHTML = Math.round(BV * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultBaseMass").innerHTML = Math.round(BM * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultBasePercent").innerHTML = Math.round(BP * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultPGVolume").innerHTML = Math.round(PGV * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultPGMass").innerHTML = Math.round(PGM * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultPGPercent").innerHTML = Math.round(PGP * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultVGVolume").innerHTML = Math.round(VGV * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultVGMass").innerHTML = Math.round(VGM * Math.pow(10,2)) / Math.pow(10,2)
    document.getElementById("calcResultVGPercent").innerHTML = Math.round(VGP * Math.pow(10,2)) / Math.pow(10,2)
    for (i = 0;  i < calcFlavorCount; i++) {
        let flavorP = calcFlavorList[i].getElementsByClassName("calcNewFlavorP")[0].value
        if (flavorP == "") {
            calcResultFlavorList[i].getElementsByClassName("calcResultPercent")[0].innerHTML = "0"
            flavorP = parseFloat(flavorP)
            calcResultFlavorList[i].getElementsByClassName("calcResultVolume")[0].innerHTML = "0"
            calcResultFlavorList[i].getElementsByClassName("calcResultMass")[0].innerHTML = "0"
        } else {
            calcResultFlavorList[i].getElementsByClassName("calcResultPercent")[0].innerHTML = flavorP
            flavorP = parseFloat(flavorP)
            let flavorVolume = flavorP * calcAmmount.value / 100
            let flavorMass = flavorVolume * 1.036
            calcResultFlavorList[i].getElementsByClassName("calcResultVolume")[0].innerHTML = Math.round(flavorVolume * Math.pow(10,2)) / Math.pow(10,2)
            //  this is where individual flavor density will need to tie into the calculator
            calcResultFlavorList[i].getElementsByClassName("calcResultMass")[0].innerHTML = Math.round(flavorMass * Math.pow(10,2)) / Math.pow(10,2)
        }
    }
}