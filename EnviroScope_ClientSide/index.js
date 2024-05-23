document.addEventListener('DOMContentLoaded', function () {
  
  interval = 66000;

  setInterval(()=>{
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
    
    temperatureValue.textContent = data.avgTemperature + '         °C';
    humidityValue.textContent = data.avgHumidity + '            RH';
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


  fetch('http://127.0.0.1:5000/predicted-values')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    console.log(data.avgTemperature)
    console.log(data.avgHumidity)
    const temperatureValue = document.querySelector('#predicted-values-table tr:nth-child(1) td:nth-child(2)');
    const humidityValue = document.querySelector('#predicted-values-table tr:nth-child(2) td:nth-child(2)');
    
    temperatureValue.innerHTML = data.avgTemperature + '    °C';
    humidityValue.innerHTML = data.avgHumidity + '     RH';
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  })

},interval)
 


});





