const apiKey = '6ba902d8f3cdd29a6b186e72707d9ea7';

function getWeather(city = null) {
  const input = document.getElementById('cityInput');
  const result = document.getElementById('weatherResult');

  if (!city) {
    city = input.value.trim();
  }

  if (city === '') {
    result.innerHTML = 'Please enter a city name.';
    return;
  }
  localStorage.setItem('lastCity', city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or invalid API key');
      }
      return response.json();
    })
    .then(data => {
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      result.innerHTML = weatherHTML;
      input.value = city;
    })
    .catch(error => {
      result.innerHTML = error.message;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('cityInput');
  const getBtn = document.getElementById('getweatherBtn');
  const clearBtn = document.getElementById('clearBtn');
  const result = document.getElementById('weatherResult');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  });
  getBtn.addEventListener('click', () => {
    getWeather();
  });
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
    getWeather(lastCity);
  }
});
