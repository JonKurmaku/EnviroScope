document.addEventListener('DOMContentLoaded', function () {
  fetch('/current-values')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const temperatureValue = document.querySelector('#current-values-table tr:nth-child(1) td:nth-child(2)');
    const humidityValue = document.querySelector('#current-values-table tr:nth-child(2) td:nth-child(2)');
    
    temperatureValue.innerHTML = data.temperature;
    humidityValue.innerHTML = data.humidity;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


  fetch('/predicted-values')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const temperatureValue = document.querySelector('#predicted-values-table tr:nth-child(1) td:nth-child(2)');
    const humidityValue = document.querySelector('#predicted-values-table tr:nth-child(2) td:nth-child(2)');
    
    temperatureValue.innerHTML = data.temperature;
    humidityValue.innerHTML = data.humidity;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  })



});





