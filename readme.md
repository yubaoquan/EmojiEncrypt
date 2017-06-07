Encrypt text to emoji icons.

install: npm install emoji-encrypt


Totally 2 methods: `encrypt` and `decrypt`.

Here is a demo:

```
const {encrypt, decrypt} = require('emoji-encrypt');

let text = 'Hello world';
let key = 'whatever';

let ciphertext = encrypt(text, key);

let originText = decrypt(ciphertext, key);

```
Here is [another demo](http://yubaoquan.github.io/encoder/encoder.html)
