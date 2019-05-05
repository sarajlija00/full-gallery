import {login, logOut, getTokenForRefresh} from './login.mjs';
import {getUser, hidenData} from './user.mjs';
import {getGallery} from './gallery.mjs';
import {showInput, resultWeather} from './weather.mjs';


window.login = login;
window.logOut = logOut;
window.getUser = getUser;
window.hidenData = hidenData;
window.getGallery = getGallery;
window.resultWeather = resultWeather;
window.showInput = showInput;
window.getTokenForRefresh = getTokenForRefresh;
