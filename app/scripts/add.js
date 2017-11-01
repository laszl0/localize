

function fillEntryWithDataFromUrl() {
    var hash = window.location.hash
    console.log(hash)
    if (hash.startsWith('#data=') == false) {
        return
    }

    var rawData = hash.replace('#data=', '')
    console.log(rawData)
    if (rawData == '') {
        return
    }

    // decode the data from a specific format
    var data = decodeURIComponent(rawData)
    var parts = data.split('|')
    var entry = {
        'location': parts[3],
        'street': parts[2],
        'number': '5',
        'region': ''
    }

    document.getElementById('location').setAttribute('value', entry.location)
    document.getElementById('street').value = entry.street
    document.getElementById('number').value = entry.number

    // fix for dynamic textfield
    document.getElementById('field-location').MaterialTextfield.checkDirty()
    document.getElementById('field-street').MaterialTextfield.checkDirty()
    document.getElementById('field-number').MaterialTextfield.checkDirty()
}

function buttonSaveHandler(e) {
    // get data
    var region = document.querySelector('input[name="regions"]:checked').value
    var guid = guidv4()
    var entry = {
        'id': guid,
        'location': document.getElementById('location').value,
        'street': document.getElementById('street').value,
        'number': document.getElementById('number').value,
        'region': region
    }
    // TODO: handle validation

    // save locations to localstorage
    var entries = loadTodaysEntries()
    entries.push(entry)
    storeTodaysEntries(entries)

    this.setAttribute("disabled", "")

    // clear url hash value, so we can't reload
    window.location.hash = ''

    //window.location.reload()
    //window.close()
    //window.history.go(-1)
    //window.location.href = "/localize"
}

function buttonCancelHandler(e) {
    window.location.href = "/localize"
}

window.addEventListener('load', function (e) {

    // render regions
    renderRegions("regions-container")

    // load data
    fillEntryWithDataFromUrl()

    // register click events
    var buttonSave = document.getElementById("button-save")
    buttonSave.addEventListener("click", buttonSaveHandler, false)

    var buttonCancel = document.getElementById("button-cancel")
    buttonCancel.addEventListener("click", buttonCancelHandler, false)

}, false)