document.addEventListener('DOMContentLoaded', () => {
    const listOfCountries = document.querySelector('.countries-list');
    const apiUrl = 'https://restcountries.com/v3.1/all';

    
    function fetchAndDisplayCountries() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch countries data');
                }
                return response.json();
            })
            .then(data => {
                displayCountries(data);
            })
            .catch(error => {
                console.error('Error fetching countries data:', error);
            });
    }

    
    function displayCountries(countries) {
        countries.forEach(country => {
            const countryItem = document.createElement('li');
            const formattedArea = country.area ? country.area.toLocaleString() : 'Unknown';

            countryItem.innerHTML = `
                <a href="country_details.html?name=${encodeURIComponent(country.name.common)}">
                    <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="30" height="20">
                    ${country.name.common} - Area: ${formattedArea} km²
                </a>
            `;

            listOfCountries.appendChild(countryItem);
        });
    }

   
    fetchAndDisplayCountries();
});