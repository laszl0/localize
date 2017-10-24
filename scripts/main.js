
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

window.addEventListener('load', function (e) {

    // get locations from localstorage
    var locationsStr = localStorage.getItem("locations")
    if (locationsStr === null) {
        locationsStr = '[]'
    }
    var locations = JSON.parse(locationsStr)
    console.log(locations)

    // add new location
    var hash = window.location.hash
    console.log(hash)
    if (hash != '') {
        var parts = hash.split('|')
        console.log(parts)

        locations.push({ 'location': parts[3], 'street': parts[2], 'number': 3 })

        // save locations to localstorage
        var locationsNewStr = JSON.stringify(locations)
        localStorage.setItem("locations", locationsNewStr)
    }

    for (var i = 0; i < locations.length; i++) {
        renderEntry(locations[i])
    }

}, false);