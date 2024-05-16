document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get('name');

    if (countryName) {
        fetchCountryDetails(countryName)
            .then(country => {
                displayCountryDetails(country);
                const capital = country.capital || 'Unknown';
                if (capital !== 'Unknown') {
                    fetchWeatherData(capital)
                        .then(weatherData => displayWeatherDetails(weatherData))
                        .catch(error => console.error('Error fetching weather data:', error));
                } else {
                    console.warn('Capital city is unknown, weather data cannot be fetched');
                }
            })
            .catch(error => console.error('Error fetching country details:', error));
    } else {
        console.error('Country name parameter is missing');
    }
});


function fetchCountryDetails(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
            return response.json();
        })
        .then(data => data[0]); 
}


function displayCountryDetails(country) {
    document.getElementById('countryName').textContent = country.name.common;
    document.getElementById('capital').textContent = country.capital || 'Unknown';
    document.getElementById('region').textContent = country.region || 'Unknown';
    document.getElementById('flag').src = country.flags.svg;
    document.getElementById('language').textContent = country.languages ? Object.values(country.languages)[0] : 'Unknown';
    document.getElementById('timezones').textContent = country.timezones ? country.timezones.join(', ') : 'Unknown';
    document.getElementById('area').textContent = country.area ? country.area.toLocaleString() : 'Unknown';
}


function fetchWeatherData(capital) {
    const weatherApiKey = '86409b5c029444aa8c7203155231912';
    return fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${capital}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        });
}


function displayWeatherDetails(weatherData) {
    document.getElementById('condition').textContent = weatherData.current.condition.text;
    const iconUrl = `https:${weatherData.current.condition.icon}`;
    document.getElementById('temp-icon').src = iconUrl;
    document.getElementById('celsius').innerHTML = `${weatherData.current.temp_c} &deg;C`;
    document.getElementById('fahrenheit').innerHTML = `${weatherData.current.temp_f} &deg;F`;
}