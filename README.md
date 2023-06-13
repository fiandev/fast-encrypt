# fast decryptor
fast decryptor for text/file (not binary) without any libraries required.

![npm package name](https://img.shields.io/npm/v/fast-encrypt?label=fast-encrypt&style=plastic)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/fast-encrypt?style=plastic)

## encryption
### encrypt text of string

```javascript
const { Encryptor } = require("fast-encrypt");

let text = "Hello World!";
let result = Encryptor.encrypt(text, {
  level: 1
}); // return object

console.log(result.hash) // results of encryption
```

### encrypt file

```javascript
const { Encryptor } = require("fast-encrypt");
const fs = require("fs");
const path = require("path");

let pathfile = path.resolve("./path/to/some-file.js");
let content = fs.readFileSync(pathfile, "utf8");
let result = Encryptor.encrypt(content, {
  output: {
    path: "./dest",
    filename: "decryptor.json"
  }
}); // return hashes of result

fs.writeFileSync(pathfile, result);
```

### use string key / cipher (cryptoJS)

```javascript
const { Encryptor } = require("fast-encrypt");

let encrypted = Encryptor.cryptoEncrypt("Hello World!", {
  key: "secret",
  algorithm: "AES", // optional
  expired: new Date ("31, 2023 Dec 11:59:59") // optional,
}) // return string result of encryption
```

## decryption
### decrypt text of encryption

```javascript
const { Encryptor } = require("fast-encrypt");

const getEncryptor = async (resource) => {
  let response = await fetch(resource);
  let result = await response.json();
  return result;
}

let decryptor = getEncryptor("decryptor.json");
let text = "some encrypted text...";
let formats = decryptor.formats;
let result = Encryptor.decrypt(text, decryptor.formats); // return object

console.log(result) // string of decrypted contents
```

### decrypt file

```javascript
const { Encryptor } = require("fast-encrypt");
const fs = require("fs");
const path = require("path");

let decryptorFile = path.resolve("./dest/decryptor.json");
let decryptorContent = fs.readFileSync(decryptorFile, "utf8");
let decryptor = JSON.parse(decryptorContent);

let pathfile = path.resolve("./path/to/some-encrypted-file.js");
let fileContent = fs.readFileSync(pathfile, "utf8");
let decrypted = Encryptor.decrypt(fileContent, decryptor.formats); // return decrypted file contents

// write content of dencrypted on file
fs.writeFileSync(pathfile, decrypted);
```

### use string key / cipher (cryptoJS)

```javascript
const { Encryptor } = require("fast-encrypt");
let decrypted = Encryptor.cryptoDecrypt(encrypted, "secret", "AES"); // returb "Hello World!
```

> built with ♥️ by fiandev