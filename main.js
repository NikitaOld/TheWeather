const searchForm = document.querySelector('#search-form');
const searchFormInput = document.querySelector('#searchFormInput');
const displayTemperature = document.querySelector('#displayTemperature');

let cityName = '';
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

function setWeatherDisplay(temp){
    displayTemperature.innerHTML = temp + '&#176';

}

function setUrl(cityName){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

function getInputCityName(){
    return searchFormInput.value;
}

function main(){
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        cityName = getInputCityName();
        let url = setUrl(cityName);

        fetch(url)
            .then(res => res.json())
            .then(data => setWeatherDisplay(parseInt(data.main.temp)));
    });
}

main();