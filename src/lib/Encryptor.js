const fs = require("fs");
const path = require("path");

const Formatter = require("./Formatter.js");
const { now } = require("../utils/functions.js");

class Encryptor {
  static generate_decryptor(result = {}, config) {
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
    
    let pathFile = path.join(path_output, output.filename);
    fs.writeFileSync(
      pathFile,
      JSON.stringify(result, null, pretty ? 2 : 0)
    );
    
    console.log(`create file ${ output.filename }`);
  }
  
  static encrypt (text, config = {}) {
    let chars = text.split("");
    let formats = Formatter.create();
    let hash = chars.map(char => formats[char] || " ").join("");
    
    let result = {
      hash: Buffer.from(hash).toString("base64"),
      formats: formats,
      date: now()
    };
    
    Encryptor.generate_decryptor(result, config);
    return result;
  }
  
  static decrypt (content, formats) {
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    let encrypted = Buffer.from(content, "base64").toString();
    let isValid = base64regex.test(encrypted);
    
    if (!isValid) return content;
    for (let key in formats) {
      let format = formats[key];
      encrypted = encrypted.split(format).join(key);
    }
    
    return encrypted;
  }
}

module.exports = Encryptor;