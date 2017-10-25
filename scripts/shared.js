function loadEntries(region) {
    var dateKey = getToday()
    var storeKey = [
        'locations-', dateKey, region
    ].join('')
    console.log(storeKey)
    var locationsStr = localStorage.getItem(storeKey)
    if (locationsStr === null) {
        locationsStr = '[]'
    }
    var data = JSON.parse(locationsStr)
    //console.log(window.locations)
    return data
}

function storeEntries(region, data) {
    var dateKey = getToday()
    var storeKey = [
        'locations-', dateKey, region
    ].join('')
    console.log(storeKey)
    var locationsNewStr = JSON.stringify(data)
    localStorage.setItem(storeKey, locationsNewStr)
}

function loadEntry(region, id) {
    var entries = loadEntries(region)
    return entries.find(function (entry) {
        return entry.id = id
    })
}

function getToday() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date;
}

function loadRegions() {
    var regions = [
        { 'id': 'region1', 'name': '1 Region' },
        { 'id': 'region2', 'name': '2 Region' },
        { 'id': 'region3', 'name': '3 Region' },
        { 'id': 'region4', 'name': '4 Region' }
    ]
    return regions
}

function guidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}
