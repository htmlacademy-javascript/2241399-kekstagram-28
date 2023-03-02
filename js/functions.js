function getStringLength(phrase, maxSymbols) {
  if (phrase.length <= maxSymbols){
    return true;
  }
  return false;
}
getStringLength('lslsls', 5);

function isPalindrome(string) {
  const strLet = string.length;
  string = string.toLowerCase().replaceAll(' ', '');
  const strReverse = string.split('').reverse().join('');
  if (strReverse == string) {
    return true;
  }
  return false;
}

isPalindrome('abccba');

function getNumber(str) {
  const intNumber = parseInt(str, 10);
  const positiveIntNumber = Math.abs(intNumber);
  return positiveIntNumber;
}
getNumber('-0,5');
