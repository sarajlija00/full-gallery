import {hidenGallery, showWeather} from './gallery.mjs'

const weather = document.getElementById('weather');
const errorDiv = document.getElementById('error');
const resultDiv = document.getElementById('rezultat');

//funkcija koja prima hidenGallery iz gallery.mjs, ima zadatak da ukloni ucitani sadrzaj gallerije i prikaze weather input
const showInput = () => {
    hidenGallery()
    weather.style = 'display: block';
}
//funkcija koja se importuje u login.mjs i ima za cilj sakrivanje wheater inputa nakon logouta 
const hidenInput = () => {
    weather.style = 'display: none';
}



//funkcija za slanje requesta
const weatherRequest = (city) => new Promise((resolve, reject) => {
    let url = `https://api.darksky.net/forecast/9a794b7e73129302a65f91966450b346/43.84864,18.35644?units=si&lang=bs`;
    let xhttp = new XMLHttpRequest();
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

//funkcija koja poziva weatherRequest, ispisuje rezultat i vraca gresku u slucaju da nesto nije dobro
const resultWeather = () => {
    showWeather()
    weatherRequest()
    .then(showResult)
    .catch(showError)
}
// ispisati rezultat vremenske prognoze
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
//greska
const showError = err => errorDiv.innerHTML = err;
export {
    showInput,
    hidenInput,
    resultWeather
}
 