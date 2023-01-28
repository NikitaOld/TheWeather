const searchForm = document.querySelector('#search-form'),
      searchFormInput = document.querySelector('#searchFormInput'),
      displayTemperature = document.querySelector('#displayTemperature'),

      addToFavouriteButton = document.querySelector('#addToFavouriteButton'),
      locationBarList = document.querySelector('#locationBarList');

let cityName = '';

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather',
      apiKey = '2f0a8362025528a4e6b5c6972b631f0c';

function addToLocalStorage(){

}

function getFromLocalStorage(){

}

function deleteItem(event) {
    const item = event.target.closest('.location-item');
    item.remove();
}

function bindEvents(locationItem){
    const delBtn = locationItem.querySelector('.location-item__delete-btn');
    delBtn.addEventListener('click', deleteItem)

    const locationName = locationItem.querySelector('.location-item__city').innerText;
    locationItem.addEventListener('click', () => {
        searchFormInput.value = locationName;
    });
}

function createElement(tag, props, ...children){
    let element = document.createElement(tag);
    Object.keys(props).forEach( key => {
        element[key] = props[key];
    })

    if (children.length > 0){
        children.forEach(child => {
            element.append(child);
        });
    }

    return element;
}

function createLocationItem(text) {
    const delIcon = createElement('img', {src: 'resources/delete_icon.png'}),
          locationItemDeleteBtn = createElement('button', { className: 'location-item__delete-btn'}, delIcon),
          locationItemCity = createElement('span', { className: 'location-item__city', innerText: text}),
          locationItem = createElement('li', { className: 'location-item' }, locationItemCity, locationItemDeleteBtn);

    bindEvents(locationItem);



    return locationItem;
}

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
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.length > 0){

        }
    })

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        cityName = getInputCityName();
        let url = setUrl(cityName);

        fetch(url)
            .then(res => res.json())
            .then(data => setWeatherDisplay(parseInt(data.main.temp)))
            .catch(err => alert(err))
    });

    addToFavouriteButton.addEventListener('click', () => {
        let locationItem = createLocationItem(getInputCityName());
        locationBarList.prepend(locationItem);
    });
}

main();