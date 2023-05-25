const Encryptor = require("./src/lib/Encryptor.js");

console.log(
  Encryptor.encrypt("secret", {
    filename: "fiandev-decryptor.json"
  })
);