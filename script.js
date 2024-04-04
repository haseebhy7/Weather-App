// Get references to the elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Add event listener to the search button
search.addEventListener('click', () => {
    const APIKey = '1ede7360e279ce4fef98fe624547808e';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == "404") {
                // If city not found, adjust container height and show error message
                container.style.height = '400px'; // Set container height
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // If city found, adjust container height and display weather information
            container.style.height = '555px'; // Set container height
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            // Update weather information
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mists':
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.textContent = `${json.main.temp}°C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

