class Forecast {
    constructor() {
        this.key = 'bngt6Sf72GwcAZXrjlBWw9mIGwlnkKPL';
        this.cityUri = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherUri = 'https://dataservice.accuweather.com/currentconditions/v1/';
    }

    async getData(city) {
        const cityDetails = await this.getCity(city);
        const weatherDetails = await this.getWeather(cityDetails.Key);
        return { cityDetails, weatherDetails }
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`
        const response = await fetch(this.cityUri + query);
        const data = await response.json()
        return data[0];
    }

    async getWeather(locationKey) {
        const query = `${locationKey}?apikey=${this.key}`;
        const response = await fetch(this.weatherUri + query);
        const data = await response.json();
        return data[0]
    }
}
