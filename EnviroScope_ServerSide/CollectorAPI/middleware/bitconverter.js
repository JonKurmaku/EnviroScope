function convertBitsToIntegers(content) {
    let integers = [];

    //DHT11 Humidity
    const firstNumber = parseInt(content.substring(0, 16), 2);
    const firstNumberIntegerPart = parseInt(content.substring(0, 8), 2);
    const firstNumberFloatingPointPart = parseInt(content.substring(8, 16), 2) / 100; 
    integers.push(firstNumberIntegerPart + firstNumberFloatingPointPart);
  
    //DHT11 Temperature
    const secondNumber = parseInt(content.substring(16, 32), 2);
    const secondNumberIntegerPart = parseInt(content.substring(16, 24), 2);
    const secondNumberFloatingPointPart = parseInt(content.substring(24, 32), 2) / 100; 
    integers.push(secondNumberIntegerPart + secondNumberFloatingPointPart);
  
    //DHT11 Checksum
    const thirdNumber = parseInt(content.substring(32, 40), 2);
    integers.push(thirdNumber);
    return  integers ;
  
  };


module.exports=convertBitsToIntegers;