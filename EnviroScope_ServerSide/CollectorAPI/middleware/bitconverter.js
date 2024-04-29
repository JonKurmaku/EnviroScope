
function convertBitsToIntegers(content) {
  const rows = content.trim().split('\n'); 
  
  const integers = [];

  rows.forEach(row => {
      const firstNumber = parseInt(row.substring(0, 16), 2);
      const firstNumberIntegerPart = parseInt(row.substring(0, 8), 2);
      const firstNumberFloatingPointPart = parseInt(row.substring(8, 16), 2) / 100;
      console.log("1::",firstNumberIntegerPart+ firstNumberFloatingPointPart)
      integers.push(firstNumberIntegerPart + firstNumberFloatingPointPart);

      const secondNumber = parseInt(row.substring(16, 32), 2);
      const secondNumberIntegerPart = parseInt(row.substring(16, 24), 2);
      const secondNumberFloatingPointPart = parseInt(row.substring(24, 32), 2) / 100;
      console.log("2::",secondNumberIntegerPart+ secondNumberFloatingPointPart)
      integers.push(secondNumberIntegerPart + secondNumberFloatingPointPart);

      const thirdNumber = parseInt(row.substring(32, 40), 2);
      console.log("3::",thirdNumber)
      integers.push(thirdNumber);
  });

  return integers;
}
module.exports=convertBitsToIntegers;