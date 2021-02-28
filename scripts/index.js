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