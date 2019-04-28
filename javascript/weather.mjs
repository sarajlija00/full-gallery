const weather = document.getElementById('weather');
const errorDiv = document.getElementById('error');
const resultDiv = document.getElementById('result');
const city = document.getElementById('insert').value; 
const showInput = () => {
    weather.style = 'display: block';
}
const hidenInput = () => {
    weather.style = 'display: none';
}

const weatherRequest = (city) => new Promise((resolve, reject) => {
    let url = `https://api.darksky.net/forecast/9a794b7e73129302a65f91966450b346/43.84864,18.35644?units=si&lang=bs`;
    let xhttp = new XMLHttpRequest();
    if (city !== 'Sarajevo'){
        errorDiv.innerHTML = 'Unesi grad Sarajevo'
        return;
    }
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let response = JSON.parse(xhttp.responseText);
            resolve(response);
        }
        if(xhttp.readyState == 4 && xhttp.status !== 200){
            reject('greska');
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
})

const resultWeather = () => {
    weatherRequest(city)
    .then(showResult)
    .catch(showError)
}

const showResult = (result) => {
     resultDiv.innerHTML = `
    <div class = "temp">
        Trenutno: ${result.currently.icon} <br>
        Trenutna temperatura: ${result.currently.temperature} °C<br>
        Vlaznost zraka: ${result.currently.humidity} %<br>
        Brzina vjetra: ${result.currently.windSpeed} km/s<br>       
        Vidljivost: ${result.currently.visibility} <br>
        UV zrake: ${result.currently.uvIndex} <br>
    </div
    `;
    
    

   
}

const showError = err => errorDiv.innerHTML = err;
export {
    showInput,
    hidenInput,
    resultWeather
}
