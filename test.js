const { Encryptor } = require("./index.js");
const fs = require("fs");
const path = require("path");

let pathfile = path.resolve("./__test__/test.js");
let content = fs.readFileSync(pathfile, "utf8");
let result = Encryptor.encrypt(content, {
  output: {
    path: "./__test__",
    filename: "encryptor.json"
  }
}); // return hashes of result

console.log(result);
fs.writeFileSync(pathfile, result);