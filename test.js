const {encrypt, decrypt} = require('./index');

let str = 'Hello world! 中文';
let key = 'lol 哈';
let result = encrypt(str, key);
let decodeResult = decrypt(result, key);
console.info(result);
console.info(decodeResult);
