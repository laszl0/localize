

function createEntryElement(entry) {

    var liElm = document.createElement('li')
    liElm.className = "mdl-list__item mdl-list__item--two-line"

    var spanPrimaryElm = document.createElement('span')
    spanPrimaryElm.className = "mdl-list__item-primary-content"

    var line1Elm = document.createElement("span")
    line1Elm.innerHTML = entry.street

    var line2Elm = document.createElement("span")
    line2Elm.className = "mdl-list__item-sub-title"
    line2Elm.innerHTML = entry.location

    spanPrimaryElm.appendChild(line1Elm)
    spanPrimaryElm.appendChild(line2Elm)

    var spanSecondElm = document.createElement('span')
    spanSecondElm.className = "mdl-list__item-secondary-content"

    var mapElm = document.createElement('a')
    mapElm.className = "mdl-list__item-secondary-action"

    var link = [
        "&destination=",
        encodeURIComponent(entry.location),
        ',',
        encodeURIComponent(entry.street)
    ]
    mapElm.href = "https://www.google.com/maps/dir/?api=1" + link.join('')

    var mapIcon = document.createElement('i')
    mapIcon.className = "material-icons"
    mapIcon.innerHTML = "map"
    mapElm.appendChild(mapIcon)

    spanSecondElm.appendChild(mapElm)

    liElm.appendChild(spanPrimaryElm)
    liElm.appendChild(spanSecondElm)

    return liElm
}

function renderEntries() {
    var regions = loadRegions()
    var indexTabsElm = document.getElementById('index-tabs')
    var containerNavbarElm = document.getElementById('index-tabs-navbar')
    var containerContentElm = document.getElementById('index-tabs-content')

    for (var i = 0; i < regions.length; i++) {

        // add navbar
        var nav = document.createElement("a")
        nav.href = "#panel-" + regions[i].id
        nav.innerHTML = regions[i].name
        nav.className = 'mdl-tabs__tab'
        if (i == 0) {
            nav.className = nav.className + ' is-active'
        }
        componentHandler.upgradeElement(nav)
        containerNavbarElm.appendChild(nav)

        // add entries container
        var containerEntriesElm = document.createElement("div")
        containerEntriesElm.className = 'mdl-tabs__panel'
        if (i == 0) {
            containerEntriesElm.className = containerEntriesElm.className + ' is-active'
        }
        containerEntriesElm.id = "panel-" + regions[i].id
        componentHandler.upgradeElement(containerEntriesElm)
        containerContentElm.appendChild(containerEntriesElm)

        // add entries
        var entries = loadEntries(regions[i].id)

        var containerListElm = document.createElement("ul")
        containerListElm.className = "mdl-list"

        for (var j = 0; j < entries.length; j++) {
            var entryElm = createEntryElement(entries[j])
            componentHandler.upgradeElement(entryElm)
            containerListElm.appendChild(entryElm)
        }

        componentHandler.upgradeElement(containerListElm)
        containerEntriesElm.appendChild(containerListElm)

    }

    componentHandler.downgradeElements(indexTabsElm)
    componentHandler.upgradeElement(indexTabsElm)
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

    // get locations from localstorage
    //loadEntries()

    // display locations
    renderEntries()

    // activate tab, also save last active tab

    //var buttonClear1 = document.getElementById("button-clear1")
    //buttonClear1.addEventListener("click", buttonClearLocalStorage, false)

}, false)