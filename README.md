# fast encryptor

## encrypt file

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

## decrypt file

```javascript
const { Encryptor } = require("fast-encrypt");
const fs = require("fs");
const path = require("path");

let encryptorFile = path.resolve("./dest/encryptor.json");
let encryptorContent = fs.readFileSync(encryptorFile, "utf8");
let encryptor = JSON.parse(encryptorContent);

let pathfile = path.resolve("./path/to/some-encrypted-file.js");
let fileContent = fs.readFileSync(pathfile, "utf8");
let decrypted = Encryptor.decrypt(fileContent, encryptor.format); // return decrypted file contents

// write content of dencrypted on file
fs.writeFileSync(pathfile, decrypted);
```