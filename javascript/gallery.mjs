const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

const galleryRequest = () => new Promise ((resolve, reject) => {
    let url = 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/images/list';
    let xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function () {
        if(xhttp.readyState == 4 && xhttp.status ==200){
            let response = JSON.parse(xhttp.responseText);
            console.log (response);
            resolve (response);
        }
        if (xhttp.readyState == 4 && xhttp.status !==200) {
            reject ('greska');
        }
    }
    xhttp.open ("GET", url, true);
    const token = localStorage.getItem('token');
    xhttp.setRequestHeader ('Authorization', token);
    xhttp.send();
})

const getGallery = () => {
    galleryRequest()
    .then (showPictures)
    .catch (error)
}

const showPictures = (result) => {
    let base = result.base_url;
    let data = result.Contents;
    for(i = 0; i < data.length; i++){
        let photo = base + '/' + data[i].Key;
        resultDiv.innerHTML += `<img src ="${photo}"
        width="300px" height="300px" class="col-sm-6 col-md-4 col-lg-3 margin">`;        
    } 
}
const error = err => errorDiv.innerHTML = err;

export {
    getGallery
}