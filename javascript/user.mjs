const userDiv = document.getElementById('user');
const userResult = document.getElementById('result')
const errorDiv = document.getElementById('error');



const user = () => new Promise ((resolve, reject) => {
    let url = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/profile';
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            let response = JSON.parse(xhttp.responseText);
            resolve(response);
        }
        if(xhttp.readyState == 4 && xhttp.status !== 200){
            reject('nesto ne valja');
        }
    }
    xhttp.open('GET', url, true);
    const token = localStorage.getItem('token');
    xhttp.setRequestHeader('Authorization', token);
    xhttp.send();
 })

 const getUser = () => {
     user()
     .then(showData)
     .catch(error)
 }

 

const showData = (result) => {
    userResult.innerHTML = `
    <div class = "menu-class result">
        ID: ${result.id} <br>
        First name: ${result.first_name} <br>
        Last name: ${result.last_name} <br>
        Email: ${result.email} <br>
    </div>
    `;
}

const hidenData = () => { 
    userResult.style = 'display: none';
}

const error = err => errorDiv.innerHTML = err;


export {
    getUser,
    hidenData
}