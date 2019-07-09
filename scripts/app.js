const cityForm = document.querySelector('.change-location');
const details = document.querySelector('.details')
const card = document.querySelector('.card');
const icon = document.querySelector('.icon img');
const timeOfDay = document.querySelector('.time')

cityForm.addEventListener('submit', e =>{
    //prevent default 
    e.preventDefault();
    const city =e.target.city.value.trim()
    cityForm.reset();

    getData(city)
    .then(data=>{
        //const temperature= data.WeatherDetails.Temperature.Metric.Value
        updateUi(data)
    })
    .catch(err=>console.log(err))


})

// fetch data from api
const getData = async (city)=>{

    const cityDetails = await getCity(city);
    console.log(cityDetails)
    const weatherDetails = await getWeather(cityDetails.Key);
    console.log(weatherDetails)
    return {
        cityDetails,
        weatherDetails
    }
}

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