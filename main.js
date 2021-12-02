let map = L.map('map')
let marker
let markerLayer
let lat
let lon

const markerRefreshIntervalID = window.setInterval(() => {
    console.log("attempting to refresh ISS data")
    fetch("https://api.wheretheiss.at/v1/satellites/25544", {
        method: "GET",
        mode: 'cors',
        headers: {}
    })
        .then(data => data.json().then(parsed => {
            if (markerLayer) {
                markerLayer.remove()
            }
            console.log(JSON.stringify(parsed, null, 3))
            lat = parsed["latitude"]
            lon = parsed["longitude"]
            map = map.setView([lat, lon], 4)
            let my_divicon = L.divIcon({
                className: 'arrow_box'
            })
            marker = L.marker([lat, lon])
            markerLayer = marker.addTo(map)
            L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    'attribution': 'Map data, copyright <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }
            ).addTo(map)
            
        }))
        .catch(error => console.error(error))
}, 5000)

const mapRefreshIntervalID = window.setInterval(() => {
    console.log("reloading map")
    if (map) {
        map.remove()
    }
    map = L.map('map').setView([lat, lon], 4)
}, 20000)