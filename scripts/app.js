const cityForm = document.querySelector('.change-location');
const details = document.querySelector('.details')
const card = document.querySelector('.card');
const icon = document.querySelector('.icon img');
const timeOfDay = document.querySelector('.time');
const forecast = new Forecast()

cityForm.addEventListener('submit', e =>{
    //prevent default 
    e.preventDefault();
    const city =e.target.city.value.trim()
    cityForm.reset();
    // update ui with new city
    forecast.getData(city)
    .then(data=> updateUi(data))
    .catch(err=>console.log(err))
    
    // set local storage
    localStorage.setItem('city',city)
})

// update UI

const updateUi = async (data) =>{
    details.innerHTML = `<h5 class="my-3">${data.cityDetails.EnglishName}</h5>
    <div class="my-3">${data.weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${data.weatherDetails.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`

    let imgSrc = '';
    if(data.weatherDetails.IsDayTime){
        imgSrc = 'img/day.svg'
    }else{
        imgSrc = 'img/night.svg'
    }

    timeOfDay.setAttribute('src', imgSrc)

    let iconSrc = `img/icons/${data.weatherDetails.WeatherIcon}.svg`
    icon.setAttribute('src',iconSrc)

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }

}

if(localStorage.getItem('city')){
    forecast.getData(localStorage.getItem('city'))
        .then(data => updateUi(data))
        .catch(err => console.log(err))
}
