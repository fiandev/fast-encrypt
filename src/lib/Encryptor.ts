const fs = require("fs");
const path = require("path");

const Formatter = require("./Formatter");
const { now } = require("../utils/functions");
import type { Result, Configuration, EncryptorFile } from "../types/Encryptor";
import type { DynamicObject } from "../types";

class Encryptor {
  private static generate_decryptor(result: Result, config: Configuration): void | boolean {
    const { output = null, pretty = true } = config;
    const supported_extension = [".json"];
    
    if (!output) return false;
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
  
  private static textToBase64 (text: string, each: number): string {
    for (let i = 1; i <= each; i++) {
      text = Buffer.from(text).toString("base64")
    }
    return text;
  }
  
  private static base64ToText (text: string, each: number): string {
    for (let i = 1; i <= each; i++) {
      text = Buffer.from(text, "base64").toString();
    }
    return text;
  }
  
  public static encrypt (text: string, config: Configuration): Result {
    let chars = text.split("");
    let { level = 1 } = config;
    let formats: DynamicObject = Formatter.create();
    let hash = chars.map(char => formats[char] || " ").join("");
    
    let result: Result = {
      hash: Encryptor.textToBase64(hash, level),
      level: level,
      formats: formats,
      date: now()
    };
    
    Encryptor.generate_decryptor(result, config);
    return result;
  }
  
  public static decrypt (content: string, encryptor: EncryptorFile): string {
    let { formats, level } = encryptor;
    let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    let encrypted: string = Encryptor.base64ToText(content, level);
    let isValid: boolean = base64regex.test(content);
    
    if (!formats || !level) throw new Error("failed, encryptor object is not valid !");
    if (!isValid) return content;
    for (let key in formats) {
      let format = formats[key];
      encrypted = encrypted.split(format).join(key);
    }
    
    return encrypted;
  }
}

module.exports = Encryptor;