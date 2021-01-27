window.onload = function () {    
    function sucess(position){
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        loadMapQuest(lat, long);
    }

    function error() {
        return loadMapQuest(37.7749, -122.4194);  
    }

    if(!navigator.geolocation){
        const h1 = document.createElement('h1');
        h1.textContent = 'You\'r browser doens\'t support our get location.';
        document.body.appendChild(h1);
    } else {
        navigator.geolocation.getCurrentPosition(sucess, error);
    }
}

function loadMapQuest(lat, long){
    L.mapquest.key = 'IikgYNONH0TmSNv0L5EruSpxB3fW3QjZ' ;
    let map = L.mapquest.map('map', {
        center: [lat, long],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });    
    
    
    let marker = L.marker([lat, long], {
        icon: L.mapquest.icons.marker({
            primaryColor: '#22407F',
            secondaryColor: '#3B5998',
            shadow: true,
            size: 'md',
            symbol: 'A'
        })
    }).bindPopup('This is you\'r location :)')
    .addTo(map);   
}