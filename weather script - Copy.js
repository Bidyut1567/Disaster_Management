const apiKey = "69fa3edcd3d94c72a80190733251104";

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  if (!location) {
    alert("Please enter a location.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found.");
      }
      return response.json();
    })
    .then(data => {
      const { name, region, country } = data.location;
      const { temp_c, condition, humidity, wind_kph, air_quality } = data.current;

      document.getElementById("weatherResult").innerHTML = `
        <h2>Weather in ${name}, ${region}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp_c}°C</p>
        <p><strong>Condition:</strong> ${condition.text}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind_kph} kph</p>
        <p><strong>Air Quality Index (PM2.5):</strong> ${air_quality.pm2_5.toFixed(2)}</p>
      `;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
