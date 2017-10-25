
function createRegionElement(uniqueId, uniqueValue) {
    var label = document.createElement("label")
    label.className = 'add-radio-square mdl-radio mdl-js-radio mdl-js-ripple-effect'
    label.htmlFor = uniqueId

    var input = document.createElement("input")
    input.type = "radio"
    input.id = uniqueId
    input.className = "mdl-radio__button"
    input.name = "regions"
    input.value = uniqueId

    var span = document.createElement("span")
    span.className = "mdl-radio__label"
    span.innerHTML = uniqueValue

    label.appendChild(input)
    label.appendChild(span)

    return label
}

function renderRegions() {

    var regions = [
        { 'id': 'region1', 'name': 'Region 1' },
        { 'id': 'region2', 'name': 'Region 2' },
        { 'id': 'region3', 'name': 'Region 3' },
        { 'id': 'region4', 'name': 'Region 4' }
    ]

    var containerElm = document.getElementById("regions-container")

    for (var i = 0; i < regions.length; i++) {
        var regionElm = createRegionElement(regions[i].id, regions[i].name)
        componentHandler.upgradeElement(regionElm)
        containerElm.appendChild(regionElm)
    }
}

function loadUrlEntry() {
    var hash = window.location.hash
    console.log(hash)

    if (hash != '' && hash != '#') {
        hash = decodeURIComponent(hash)
        var parts = hash.split('|')
        console.log(parts)

        if (parts.length > 4) {
            document.getElementById('location').value = parts[3]
            document.getElementById('street').value = parts[2]
            document.getElementById('number').value = '3'
        }

        // clear url hash value
        window.location.hash = ''
    }
}

function buttonSaveHandler(e) {
    // get data
    var region = document.querySelector('input[name="regions"]:checked').value
    var entry = {
        'location': document.getElementById('location').value,
        'street': document.getElementById('street').value,
        'number': document.getElementById('number').value,
        'region': region
    }
    // TODO: handle validation

    // save locations to localstorage
    var entries = loadEntries(region)
    entries.push(entry)
    storeEntries(region, entries)

    window.location.href = "/localize"
}

function buttonCancelHandler(e) {
    window.location.href = "/localize"
}

window.addEventListener('load', function (e) {

    // load location data from url
    loadUrlEntry()

    // render regions
    renderRegions()

    // register click events
    var buttonSave = document.getElementById("button-save")
    buttonSave.addEventListener("click", buttonSaveHandler, false)

    var buttonCancel = document.getElementById("button-cancel")
    buttonCancel.addEventListener("click", buttonCancelHandler, false)

}, false)