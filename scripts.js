window.addEventListener('load', () =>{
let long;
let lat;

const temperaturaDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const temperatureSpan = document.querySelector('.degree-section span')

const iconSection = document.querySelector('.location')


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        // getting user positions
        long = position.coords.longitude;
        lat = position.coords.latitude;

        console.log(lat, long)
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ef4f040af074dae3dcbd864e0da45559`;
        
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
        const data = json;
         // LOCATION
        locationTimezone.textContent = json.name;
        // DEGREES
        const temp = json.main.temp
        // converting from kelvin to fahrenheit, since its the main value in the weather API.
        const fah = ((temp * 9) / 5 - 459.67).toFixed(2)
        temperatureDegree.textContent = fah;
        // WEATHER DESCRIPTION
        temperaturaDescription.textContent = json.weather[0].description;
        //SETTING ICON
        const icon = data.weather[0].icon;
        setIcon(icon);
        toggleBodyColor(icon)

        document.querySelector('.degree-section').addEventListener('click',
        () => FahrenheitToCelsius(fah));
        });
    }); 
} 

function setIcon(icon){
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const img = document.createElement('img');
    img.src = iconURL;
    iconSection.appendChild(img);
}

function toggleBodyColor(icon){
    if(icon == '01d'){
       return document.body.style.backgroundImage = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
    }else if(icon == '02d'){
        return document.body.style.backgroundImage = 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)';
    }else if(icon == '03d'){
        return document.body.style.backgroundImage = 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)';
    }else if(icon == '04d'){
        document.body.style.backgroundImage = 'none';
        document.body.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898';
    }else if(icon == '09d'){
        return document.body.style.backgroundImage = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
    }else if(icon == '10d'){
        return document.body.style.backgroundImage = 'linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)';
    }else if(icon == '11d'){
        return document.body.style.backgroundImage = 'linear-gradient(to right, #868f96 0%, #596164 100%)';
    }else if(icon == '13d'){
        return document.body.style.backgroundImage = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    }else if(icon == '14d'){
        return document.body.style.backgroundImage = 'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)';
    }
}

function FahrenheitToCelsius(fah){
    // Fahrenheit to Celsius Formula: (°F - 32) / 1.8 = °C
    if (temperatureDegree.classList.contains('fah')){
        fah = ((fah - 32) / 1.8).toFixed(2);
        temperatureDegree.classList.remove('fah');
        temperatureDegree.classList.add('cel');

        temperatureDegree.textContent = Number(fah);
        temperatureSpan.textContent = '°C'
        } else if(temperatureDegree.classList.contains('cel')){
            // Celsius to Fahrenheit Formula: (°C * 1.8) + 32 = °F  
            let cel = temperatureDegree.textContent      
            cel = ((cel * 1.8) + 32).toFixed(2);

            temperatureDegree.classList.remove('cel');
            temperatureDegree.classList.add('fah');

            temperatureDegree.textContent = Number(cel)  
            temperatureSpan.textContent = '°F'            
        }
    }
});
