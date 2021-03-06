import {hidenData} from './user.mjs';
import {hidenInput} from './weather.mjs';



const loginDiv = document.getElementById('login-form');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const menuDiv = document.getElementById('menu');
const forgotPasswordDiv = document.getElementById('pass');
const weather = document.getElementById('weather');
//sakriti whetarer sa indexa
weather.style = 'display: none';
//sakriti menu sa indexa 
menuDiv.style = 'display: none';

//funkcija koja salje reguest i vraca response
const loginRequest = (email, password) => new Promise ((resolve, reject) => {
    let url = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login';
    let xhttp = new XMLHttpRequest ();
    let object = {
        email,
        password
    }
    let request = JSON.stringify(object);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            resolve(response);
        }
        if (xhttp.readyState == 4 && xhttp.status !== 200) {
            reject ('Invalid email or password');
        }
    }
    xhttp.open ('POST', url, true);
    xhttp.setRequestHeader ("Content-type", "application/json;charset=UTF-8");
    xhttp.send(request);
}) 

//funkcija koja prima vrijednost inputa i poziva funkciju request
const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginRequest(email, password)
    .then (setToken)
    .catch (showError)
}

//funkcija za odlogovanje, sakrivanje menia i ponovno prikazivanje login formee
const logOut = () => {
    hidenData()
    hidenInput()
    localStorage.removeItem ('token');
    loginDiv.style = 'display: block';
    menuDiv.style = 'display: none';
    //(za Almira) errorDiv.style = 'display: block'; ispisuje mi greske na ekranu nakon logouta 
    forgotPasswordDiv.style = 'display: block';

}

//funkcija koja cuva token, sakriva login formu i pokazuje mani
const setToken = response => {
    localStorage.setItem ('token', response.token);
    loginDiv.style = 'display: none';
    menuDiv.style = 'display: block';
    errorDiv.style = 'display: none';
    forgotPasswordDiv.style = 'display: none';
}

//funkcija za prikazivanje greske
const showError = err => errorDiv.innerHTML = err;

const getTokenForRefresh = () => {
    const token = localStorage.getItem ('token');
    if (!token) {
        loginDiv.style = 'display: block';
        menuDiv.style = 'display: none';
        
    }
    else {
        loginDiv.style = 'display: none';
        menuDiv.style = 'display: block';
        forgotPasswordDiv.style = 'display: none';
    }
}


export {
    login,
    logOut,
    getTokenForRefresh
}
