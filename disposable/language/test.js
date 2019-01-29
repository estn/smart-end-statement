let str = '  if';

console.log(str.length);


console.log(findNotBlankCharIndex(str));
function findNotBlankCharIndex(str) {
  let length = str.length;
  for (let i = 0; i < length; i++) {
    if(str[i] !== ' '){
      return i;
    }    
  }
}
