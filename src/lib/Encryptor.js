const fs = require("fs");
const path = require("path");

const Formatter = require("./Formatter.js");
const { now } = require("../utils/functions.js");

class Encryptor {
  static generate_decryptor(hash, format = {}, config = {}) {
    const { output, pretty = true } = config;
    const supported_extension = [".json"];
    
    let ext = path.extname(output.filename);
    if (!supported_extension.includes(ext)) throw new Error(`Unsupported extension for decryptor file expected [${ supported_extension.toString().replace(",", "|") }]`);
    
    let path_output = path.join(process.cwd(), output.path);
    try {
      if (!fs.existsSync(path_output)) fs.mkdirSync(path_output, { recursive: true });
    } catch (e) {
      throw new Error(`can't create path of folders`);
    }
    
    fs.writeFileSync(
      path.join(path_output, output.filename),
      JSON.stringify({
        hash: hash,
        format: format,
        date: now()
      }, null, pretty ? 2 : 0)
    );
    
    console.log(`create file ${ output.filename }`);
  }
  
  static encrypt (text, config = {}) {
    let chars = text.split("");
    let format = Formatter.create();
    let result = chars.map(char => format[char] || " ").join("");
    
    Encryptor.generate_decryptor(result, format, config);
    return result;
  }
  
  static decrypt (encrypted, formats) {
    let res = "";
    for (let key in formats) {
      let format = formats[key];
      let search = encrypted.search(format);
      encrypted = encrypted.split(format).join(key);
    }
    
    return encrypted;
  }
}

module.exports = Encryptor;