import {hidenInput} from './weather.mjs';

const resultDivGallery = document.getElementById('result');
const errorDiv = document.getElementById('error');

//funkcija za slanje requesta
const galleryRequest = () => new Promise ((resolve, reject) => {
    let url = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/images/list';
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status ==200){
            let response = JSON.parse(xhttp.responseText);
            resolve (response);
        }
        if (xhttp.readyState == 4 && xhttp.status !==200) {
            reject ('greska');
        }
    }
    xhttp.open ("GET", url, true);
    //cuvanje tokena
    const token = localStorage.getItem('token');
    xhttp.setRequestHeader ('Authorization', token);
    xhttp.send();
})
//funkcija koja poziva user, ispisuje rezultat i vraca gresku u slucaju da nesto nije dobro
const getGallery = () => {
    galleryRequest()
    .then (showPictures)
    .catch (error)
}
//ispisati rezultat
const showPictures = (result) => {
    let base = result.base_url;
    let data = result.Contents;
    resultDivGallery.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        let photo = base + '/' + data[i].Key;
        resultDivGallery.innerHTML += `<img src ="${photo}"
        width="150px" height="300px" class="col-sm-6 col-md-4 col-lg-3 images">`;   
    } 
    
}

//funkcija koja se importuje u weather, ima zadatak da sakrije ispisanu galleryu nakon sto se se izvrsi klick na weather u navu 
const hidenGallery = () => {
    resultDivGallery.style = 'display: none';
}

const showGalleryy = () => {
    resultDivGallery.style = 'display: block';
}
//funkcija koja se importuje u weather, i ima za cilj ponovno prikazivanje weather rezultata
const showWeather = () => {
    resultDivGallery.style = 'display: none';
}
//greska
const error = err => errorDiv.innerHTML = err;

export {
    getGallery,
    hidenGallery,
    showWeather
}