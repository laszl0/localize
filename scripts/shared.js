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

