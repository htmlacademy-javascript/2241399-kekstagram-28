function getStringLength(phrase, maxSymbols) {
  return phrase.length <= maxSymbols;
}

function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  const strReverse = string.split('').reverse().join('');
  if (strReverse === string) {
    return true;
  }
  return false;
}


function extractNumber(string) {
  let result = '';
  for (let i = 0; i < string.length; i++){
    if(!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
}

function myPadStart(string, minLenght, pad) {
  const actualPad = minLenght - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.lenght) + string;
}
