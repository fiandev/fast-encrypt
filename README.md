# fast encryptor
fast encryptor for text/file (not binary) without any libraries required.

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
    filename: "encryptor.json"
  }
}); // return hashes of result

fs.writeFileSync(pathfile, result);
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

let encryptor = getEncryptor("encryptor.json");
let text = "some encrypted text...";
let formats = encryptor.formats;
let result = Encryptor.decrypt(text, encryptor.formats); // return object

console.log(result) // string of decrypted contents
```

### decrypt file

```javascript
const { Encryptor } = require("fast-encrypt");
const fs = require("fs");
const path = require("path");

let encryptorFile = path.resolve("./dest/encryptor.json");
let encryptorContent = fs.readFileSync(encryptorFile, "utf8");
let encryptor = JSON.parse(encryptorContent);

let pathfile = path.resolve("./path/to/some-encrypted-file.js");
let fileContent = fs.readFileSync(pathfile, "utf8");
let decrypted = Encryptor.decrypt(fileContent, encryptor.formats); // return decrypted file contents

// write content of dencrypted on file
fs.writeFileSync(pathfile, decrypted);
```


> built with ♥️ by fiandev