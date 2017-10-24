
function renderEntry(entry) {

    var tr = document.createElement("tr")

    var td1 = document.createElement("td")
    td1.className = 'mdl-data-table__cell--non-numeric'
    td1.innerHTML = entry.location //'Bad Tölz'
    tr.appendChild(td1)

    var td2 = document.createElement("td")
    td2.className = 'mdl-data-table__cell--non-numeric'
    td2.innerHTML = entry.street //'Am Schloßplatz'
    tr.appendChild(td2)

    var td3 = document.createElement("td")
    td3.innerHTML = entry.number //'2'
    tr.appendChild(td3)

    componentHandler.upgradeElement(tr)
    document.getElementById('table-body').appendChild(tr)
}

function renderEntries() {
    for (var i = 0; i < window.locations.length; i++) {
        renderEntry(window.locations[i])
    }
}

function loadEntries() {
    var locationsStr = localStorage.getItem("locations")
    if (locationsStr === null) {
        locationsStr = '[]'
    }
    window.locations = JSON.parse(locationsStr)
    console.log(window.locations)
}

function addNewEntry() {
    var hash = window.location.hash
    console.log(hash)
    document.getElementById('queryParams').innerHTML = hash
    if (hash != '') {
        hash = decodeURIComponent(hash)
        var parts = hash.split('|')
        console.log(parts)

        window.locations.push({ 'location': parts[3], 'street': parts[2], 'number': 3 })

        // save locations to localstorage
        var locationsNewStr = JSON.stringify(window.locations)
        localStorage.setItem("locations", locationsNewStr)
    }
}

function buttonClearLocalStorage(e) {
    localStorage.clear()
    var node = document.getElementById('table-body')
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild)
    }
    loadEntries()
    renderEntries()
}

window.addEventListener('load', function (e) {

    var buttonClear = document.getElementById("button-clear")
    buttonClear.addEventListener("click", buttonClearLocalStorage, false)

    var buttonClear1 = document.getElementById("button-clear1")
    buttonClear1.addEventListener("click", buttonClearLocalStorage, false)

    // get locations from localstorage
    loadEntries()

    // add new location
    addNewEntry()

    // display locations
    renderEntries()
}, false)