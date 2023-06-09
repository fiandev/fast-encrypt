const { Encryptor } = require("./dist/index.js");
const fs = require("fs");

/*
let encryptor = JSON.parse(fs.readFileSync("./__test__/encryptor.json", "utf8"));
let text = encryptor.hash;
let formats = encryptor.formats;
let result = Encryptor.decrypt(text, encryptor.formats); // return object

console.log({ result }); // string of decrypted contents
*/

/*
*/
let content = fs.readFileSync("./src/lib/Encryptor.ts", "utf8");
let enc = Encryptor.encrypt(content, {
  level: 5,
});
let dec = Encryptor.decrypt(enc.hash, enc);
console.log({ enc, dec });