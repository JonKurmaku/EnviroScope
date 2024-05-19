function convertBitsToIntegers(array) {
  const integers = [];

  array.forEach(entry => {
      const firstNumberIntegerPart = parseInt(entry.substring(0, 8), 2);
      const firstNumberFloatingPointPart = parseInt(entry.substring(8, 16), 2) / 100;
      const firstNumber = firstNumberIntegerPart + firstNumberFloatingPointPart;
      integers.push(firstNumber);

      const secondNumberIntegerPart = parseInt(entry.substring(16, 24), 2);
      const secondNumberFloatingPointPart = parseInt(entry.substring(24, 32), 2) / 100;
      const secondNumber = secondNumberIntegerPart + secondNumberFloatingPointPart;
      integers.push(secondNumber);

      const thirdNumber = parseInt(entry.substring(32, 40), 2);
      integers.push(thirdNumber);
  });

  return integers;
}

module.exports = convertBitsToIntegers;
