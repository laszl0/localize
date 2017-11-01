
function fillEntryWithDataFromId() {
    var hash = window.location.hash
    console.log(hash)
    if (hash.startsWith('#id=') == false) {
        window.location.href = "/localize"
    }

    var guid = hash.replace('#id=', '')
    console.log(guid)
    if (guid == '') {
        window.location.href = "/localize"
    }

    var entries = loadTodaysEntries()
    var entry = entries.find(function (entry) {
        return entry.id = guid
    })

    if (entry == null) {
        window.location.href = "/localize"
    }

    if (entry != null) {
        document.getElementById('id').setAttribute('value', entry.id)
        document.getElementById('location').setAttribute('value', entry.location)
        document.getElementById('street').value = entry.street
        document.getElementById('number').value = entry.number
        document.querySelector('input[name="regions"][value="' + entry.region + '"]').setAttribute('checked', '')

        // fix for dynamic textfield
        document.getElementById('field-location').MaterialTextfield.checkDirty()
        document.getElementById('field-street').MaterialTextfield.checkDirty()
        document.getElementById('field-number').MaterialTextfield.checkDirty()
        document.querySelector('input[name="regions"][value="' + entry.region + '"]').parentElement.MaterialRadio.check()
        
    }
}

function buttonSaveHandler(e) {
    // TODO: don't allow multiple clicks/touches
    //this.setAttribute("disabled", "")

    // get data
    var region = document.querySelector('input[name="regions"]:checked').value
    var guid = document.getElementById('id').value
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
    var entryIndex = entries.findIndex(function (entry) {
        return entry.id = guid
    })
    entries[entryIndex] = entry
    storeTodaysEntries(entries)

    window.location.href = "/localize"
}

function buttonCancelHandler(e) {
    window.location.href = "/localize"
}

function buttonDeleteHandler(e) {
    // TODO: don't allow multiple clicks/touches
    var guid = document.getElementById('id').value

    // TODO: handle validation

    // remove location and save to localstorage
    var entries = loadTodaysEntries()
    var entryIndex = entries.findIndex(function (entry) {
        return entry.id = guid
    })
    entries.splice(entryIndex, 1)
    storeTodaysEntries(entries)

    window.location.href = "/localize"
}

window.addEventListener('load', function (e) {

    // render regions
    renderRegions("regions-container")

    // load data
    fillEntryWithDataFromId()

    // register click events
    var buttonSave = document.getElementById("button-save")
    buttonSave.addEventListener("click", buttonSaveHandler, false)

    var buttonCancel = document.getElementById("button-cancel")
    buttonCancel.addEventListener("click", buttonCancelHandler, false)

    var buttonDelete = document.getElementById("button-delete")
    buttonDelete.addEventListener("click", buttonDeleteHandler, false)

}, false)