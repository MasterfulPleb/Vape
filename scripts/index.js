console.log("Vape Shit 0.1.0 initiated")

function showCalculator() {
    document.getElementById("calculator").style.display = "block"
    document.getElementById("recipes").style.display = "none"
    document.getElementById("flavors").style.display = "none"
    document.getElementById("batchHistory").style.display = "none"
}

function showRecipes() {
    document.getElementById("calculator").style.display = "none"
    document.getElementById("recipes").style.display = "block"
    document.getElementById("flavors").style.display = "none"
    document.getElementById("batchHistory").style.display = "none"
}

function showFlavors() {
    document.getElementById("calculator").style.display = "none"
    document.getElementById("recipes").style.display = "none"
    document.getElementById("flavors").style.display = "block"
    document.getElementById("batchHistory").style.display = "none"
}

function showBatchHistory() {
    document.getElementById("calculator").style.display = "none"
    document.getElementById("recipes").style.display = "none"
    document.getElementById("flavors").style.display = "none"
    document.getElementById("batchHistory").style.display = "block"
}
