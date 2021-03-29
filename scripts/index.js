const { promises } = require('dns')
var fs = require('fs')


console.log('Vape Shit 0.2.0 initiated')


/**
 * view switching
 */
let views = Array.from($('#views').children())
function switchView(viewsId) {
    views.forEach(view => view.style.display = viewsId == view.id ? 'block' : 'none')
}
switchView('calc')


/**
 * Calculator Functionality
 */
let calcFlavorCount = 0
/** @type {Array<HTMLElement>} */
let calcFlavorList = []
/** @type {Array<HTMLElement>} */
let calcResultFlavorList = []
const calcAmmount = document.getElementById('calcAmmount')
const calcStrength = document.getElementById('calcStrength')
const calcPG = document.getElementById('calcPG')
const calcVG = document.getElementById('calcVG')
const calcBaseStrength = document.getElementById('calcBaseStrength')
const calcBasePG = document.getElementById('calcBasePG')
const calcBaseVG = document.getElementById('calcBaseVG')
calcPG.onchange = () => calcVG.value = '100' - calcPG.value
calcVG.onchange = () => calcPG.value = '100' - calcVG.value
calcBasePG.onchange = () => calcBaseVG.value = '100' - calcBasePG.value
calcBaseVG.onchange = () => calcBasePG.value = '100' - calcBaseVG.value
$('#calcFlavors').on('change', updateCalc)
$('#calcTopLeft').on('change', updateCalc)
function addFlavor() {
    calcFlavorCount++
    //  add flavor 
    let newFlavor = document.getElementById('calcFlavors').appendChild(document.createElement('div'))
    newFlavor.id = 'calcNewFlavor' + calcFlavorCount
    newFlavor.className = 'calcNewFlavor'
    let newInput = newFlavor.appendChild(document.createElement('input'))
    newInput.id = 'calcFlavor' + calcFlavorCount
    newInput.className = 'calcNewFlavorName'
    newInput.type = 'text'
    newInput.placeholder = 'Flavor ' + calcFlavorCount
    let newPercentInput = newFlavor.appendChild(document.createElement('input'))
    newPercentInput.id = 'calcFlavorPercent' + calcFlavorCount
    newPercentInput.className = 'calcNewFlavorP'
    newPercentInput.type = 'number'
    newPercentInput.step = '.1'
    newPercentInput.min = '0'
    newPercentInput.max = '100'
    let newP = newFlavor.appendChild(document.createElement('p'))
    newP.className = 'calcNewFlavorSign'
    newP.innerHTML = '%'
    let newIndicator = newFlavor.appendChild(document.createElement('img'))
    newIndicator.className = 'indicator'
    newIndicator.src = 'images/red_indicator.png'
    //  add result flavor
    let resultsNewFlavor = document.getElementById('calcResult').appendChild(document.createElement('div'))
    resultsNewFlavor.id = 'calcResultFlavor' + calcFlavorCount
    resultsNewFlavor.className = 'calcResultRow'
    if (calcFlavorCount % 2 == 0 ) {
        resultsNewFlavor.classList.add('calcResultRowEven')
    }
    let resultsFlavorName = resultsNewFlavor.appendChild(document.createElement('p'))
    resultsFlavorName.id = 'calcResultFlavorName' + calcFlavorCount
    resultsFlavorName.className = 'calcResultFlavor'
    resultsFlavorName.innerHTML = 'Flavor ' + calcFlavorCount
    let resultsVolume = resultsNewFlavor.appendChild(document.createElement('p'))
    resultsVolume.id = 'calcResultFlavorVolume' + calcFlavorCount
    resultsVolume.className = 'calcResultVolume'
    resultsVolume.innerHTML = '0'
    let resultsMass = resultsNewFlavor.appendChild(document.createElement('p'))
    resultsMass.id = 'calcResultFlavorMass' + calcFlavorCount
    resultsMass.className = 'calcResultMass'
    resultsMass.innerHTML = '0'
    let resultsPercent = resultsNewFlavor.appendChild(document.createElement('p'))
    resultsPercent.id = 'calcResultFlavorPercent' + calcFlavorCount
    resultsPercent.className = 'calcResultPercent'
    resultsPercent.innerHTML = '0'
    //  add event listener for flavor name
    newInput.onchange = () => {
        resultsFlavorName.innerHTML = newInput.value == '' ? newInput.placeholder : newInput.value
    }
    //  add flavor to array
    calcFlavorList.push(newFlavor)
    calcResultFlavorList.push(resultsNewFlavor)
}
function removeFlavor() {
    if (calcFlavorList.length > 0) {
        //  remove flavor
        $('#calcNewFlavor' + calcFlavorCount).remove()
        //  remove result flavor
        $('#calcResultFlavor' + calcFlavorCount).remove()
        //  increment flavor count
        calcFlavorCount--
        //  remove flavor from array
        calcFlavorList.length -= 1
        calcResultFlavorList.length -=1
        //  update calculator
        updateCalc()
    }
}
function rounded(x) {
    return Math.round(x * Math.pow(10,2)) / Math.pow(10,2)
}
function updateCalc() {
    let totalFlavorPercent = 0
    //  flavors calculation
    for (i = 0;  i < calcFlavorCount; i++) {
        let flavorP = calcFlavorList[i].getElementsByClassName('calcNewFlavorP')[0].value
        let flavorName = calcFlavorList[i].getElementsByClassName('calcNewFlavorName')[0].value
        if (flavorP == '') {
            if (flavorDensityArray.some(obj => obj.flavor == flavorName)) {
                calcFlavorList[i].getElementsByClassName('indicator')[0].src = 'images/green_indicator.png'
            } else {
                calcFlavorList[i].getElementsByClassName('indicator')[0].src = 'images/red_indicator.png'
            }
            calcResultFlavorList[i].getElementsByClassName('calcResultVolume')[0].innerHTML = '0'
            calcResultFlavorList[i].getElementsByClassName('calcResultMass')[0].innerHTML = '0'
            calcResultFlavorList[i].getElementsByClassName('calcResultPercent')[0].innerHTML = '0'
        } else {
            let density = 1.036
            if (flavorDensityArray.some(obj => obj.flavor == flavorName)) {
                density = flavorDensityArray.find(obj => obj.flavor == flavorName).density
                calcFlavorList[i].getElementsByClassName('indicator')[0].src = 'images/green_indicator.png'
            } else {
                calcFlavorList[i].getElementsByClassName('indicator')[0].src = 'images/red_indicator.png'
            }
            flavorP = parseFloat(flavorP)
            totalFlavorPercent += flavorP
            let flavorVolume = flavorP * calcAmmount.value / 100
            let flavorMass = flavorVolume * density
            calcResultFlavorList[i].getElementsByClassName('calcResultVolume')[0].innerHTML = rounded(flavorVolume)
            calcResultFlavorList[i].getElementsByClassName('calcResultMass')[0].innerHTML = rounded(flavorMass)
            calcResultFlavorList[i].getElementsByClassName('calcResultPercent')[0].innerHTML = flavorP
        }
    }
    //  everything else calculation
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
    $('#calcResultBaseVolume').text(rounded(BV))
    $('#calcResultBaseMass').text(rounded(BM))
    $('#calcResultBasePercent').text(rounded(BP))
    $('#calcResultPGVolume').text(rounded(PGV))
    $('#calcResultPGMass').text(rounded(PGM))
    $('#calcResultPGPercent').text(rounded(PGP))
    $('#calcResultVGVolume').text(rounded(VGV))
    $('#calcResultVGMass').text(rounded(VGM))
    $('#calcResultVGPercent').text(rounded(VGP))
}
function parseCSV(input, output) {
    fs.readFile(input, (err, data) => {
        let bufferString
        let arr = []
        bufferString = data.toString()
        arr = bufferString.split('\n')
        let headers = arr[0].split(',')
        for (let i = 1; i < arr.length; i++) {
            let data = arr[i].split(',')
            let obj = {}
            for (let j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim()
            }
            output.push(obj)
        }
    })
}
function saveRecipe(recipeName) {
    let recipe = [calcAmmount.value, calcStrength.value, calcPG.value, calcVG.value, calcBaseStrength.value, calcBasePG.value, calcBaseVG.value, JSON.stringify(document.getElementById('calcCommentsBox').value), calcFlavorCount]
    for (i = 0; i < calcFlavorCount; i++) {
        recipe.push(calcFlavorList[i].getElementsByClassName('calcNewFlavorName')[0].value)
        recipe.push(calcFlavorList[i].getElementsByClassName('calcNewFlavorP')[0].value)
    }
    recipe = recipe.join('|')
    recipe += '\n'
    let address = './data/recipes/' + recipeName + '.csv'
    fs.appendFile(address, recipe, (err) => {
        if (err) throw err
        console.log('recipe saved')
    })
}
function importRecipe(recipeName) {
    let address = './data/recipes/' + recipeName + '.csv'
    let bufferString = fs.readFileSync(address)
    let arr = bufferString.toString().split('\n')
    for (i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('|')
    }
    if (arr[arr.length - 1][0] == '') {
        arr.length -= 1
    }
    workingRecipe = arr
    console.log('imported')
}
function loadRecipe(recipeName) {
    importRecipe(recipeName)
    let arr = workingRecipe[workingRecipe.length - 1]
    calcAmmount.value = arr[0]
    calcStrength.value = arr[1]
    calcPG.value = arr[2]
    calcVG.value = arr[3]
    calcBaseStrength.value = arr[4]
    calcBasePG.value = arr[5]
    calcBaseVG.value = arr[6]
    let comment = JSON.parse(arr[7])
    document.getElementById('calcCommentsBox').value = comment
    for (i = calcFlavorCount; i > -1; i--) {
        removeFlavor()
    }
    for (i = 0, f = 9; i < parseInt(arr[8]); i++, f++) {
        addFlavor()
        calcFlavorList[i].getElementsByClassName('calcNewFlavorName')[0].value = arr[f]
        f++
        calcFlavorList[i].getElementsByClassName('calcNewFlavorP')[0].value = arr[f]
    }
    updateCalc()
    for (i = 0; i < calcFlavorCount; i++) {
        calcResultFlavorList[i].getElementsByClassName('calcResultFlavor')[0].innerHTML =
        calcFlavorList[i].getElementsByClassName('calcNewFlavorName')[0].value
    }
    console.log('recipe loaded')
}
addFlavor()
let flavorDensityArray = []
parseCSV('./data/flavorDensity.csv', flavorDensityArray)
/** @type {Array<Array<String>>} */
let workingRecipe = [[]]