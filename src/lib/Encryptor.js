const fs = require("fs");
const path = require("path");

const Formatter = require("./Formatter.js");
const { now } = require("../utils/functions.js");

class Encryptor {
  static generate_decryptor(hash, format = {}, config = {}) {
    const { filename = "decrypt.json", pretty = true } = config;
    
    fs.writeFileSync(
      path.join(__dirname, filename),
      JSON.stringify({
        hash: hash,
        format: format,
        date: now()
      }, null, pretty ? 2 : 0)
    );
    
    console.log(`create file ${ filename }`);
  }
  
  static encrypt (text, config = {}) {
    let chars = text.split("");
    const format = Formatter.create({
      
    });
    
    let result = chars.map(char => format[char] || " ").join("");
    
    Encryptor.generate_decryptor(result, format);
    return result;
  }
  
  static decrypt (encrypted, formats) {
    let res = ""
    for (let key in formats) {
      let format = formats[key];
      let search = encrypted.search(format);
      encrypted = encrypted.split(format).join(key);
    }
    
    return encrypted;
  }
}

module.exports = Encryptor;