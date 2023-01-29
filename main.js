const searchForm = document.querySelector('#search-form'),
      searchFormInput = document.querySelector('#searchFormInput'),
      displayTemperature = document.querySelector('#displayTemperature'),

      addToFavouriteButton = document.querySelector('#addToFavouriteButton'),
      locationBarList = document.querySelector('#locationBarList');

let favouriteList = [];

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather',
      apiKey = '2f0a8362025528a4e6b5c6972b631f0c';


function addToLocalStorage(list){
    localStorage.setItem('favouriteList', JSON.stringify(list));
}

function getFromLocalStorage(){
    let temp = JSON.parse(localStorage.getItem('favouriteList'));
    if (temp.length > 0){
        temp.forEach((item) => {
            try{
                createLocationItem(item.itemName, item.itemKey);
            } catch (err){
                alert(err)
            }
        })
    }
}

function renderLocationItem(locationItem){
    locationBarList.prepend(locationItem)
}

function deleteItem(itemId, e){
    let item = e.target.closest('.location-item');
    item.remove();

    favouriteList = favouriteList.filter(item => {
        return item.itemKey !== itemId;
    });

    // update the localStorage
    addToLocalStorage(favouriteList);
}

function bindEvents(locationItem){
    const delBtn = locationItem.querySelector('.location-item__delete-btn');
    delBtn.addEventListener('click', e => {
        deleteItem(locationItem.itemKey, e)
    })

    // const locationName = locationItem.querySelector('.location-item__city').innerText;
    // locationItem.addEventListener('click', () => {
    //     searchFormInput.value = locationName;
    // });
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

function createLocationItem(itemName, itemId){
    const delIcon = createElement('img', {src: 'resources/delete_icon.png'}),
          locationItemDeleteBtn = createElement('button', { className: 'location-item__delete-btn'}, delIcon),
          locationItemCity = createElement('span', { className: 'location-item__city', innerText: itemName}),
          locationItem = createElement('li', { className: 'location-item', 'itemKey': itemId, 'itemName': itemName }, locationItemCity, locationItemDeleteBtn);

    favouriteList.push(locationItem);
    addToLocalStorage(favouriteList);

    bindEvents(locationItem);

    renderLocationItem(locationItem);
}

function setWeatherDisplay(temp){
    displayTemperature.innerHTML = temp + '&#176';
}

function setUrl(cityName){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
}

addToFavouriteButton.addEventListener('click', () => {
    createLocationItem(searchFormInput.value, Date.now());
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = setUrl(searchFormInput.value);

    fetch(url)
        .then(res => res.json())
        .then(data => setWeatherDisplay(parseInt(data.main.temp)))
        .catch(err => alert(err))
})

getFromLocalStorage();
