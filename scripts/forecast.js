const key = 'bngt6Sf72GwcAZXrjlBWw9mIGwlnkKPL'

const getCity = async (city) => {
    
    const endpoint = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(endpoint + query);
    const data = await response.json()

    return data[0];
}

const getWeather = async (locationKey) =>{

    const endpoint = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${key}`;

    const response = await fetch(endpoint + query);
    const data = await response.json();

    return data[0]
}

/* getCity('manchester')
.then(data =>{
    getWeather(data.Key)
    .then(data=>{
        console.log(data)
    })
})
.catch(err=>console.log(err)); */