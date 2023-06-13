const _fs = require("fs");
const _path = require("path");
const _cryptoJS = require("crypto-js");

const Formatter = require("./Formatter");
const { now } = require("../utils/functions");
import type {
  Result,
  Output,
  Configuration,
  DecryptorFile,
  DynamicObject,
  CryptoConfiguration,
} from "../types";

class Encryptor {
  private static decryptorGenerate(
    result: Result,
    config: Configuration
  ): void {
    const defaultOutput: Output = {
      path: "./",
      filename: `decryptor.json`,
    };

    const { output = defaultOutput, pretty = true } = config;
    const supported_extension = [".json"];

    if (!output) return;
    let ext = _path.extname(output.filename);
    if (!supported_extension.includes(ext))
      throw new Error(
        `Unsupported extension for decryptor file expected [${supported_extension
          .toString()
          .replace(",", "|")}]`
      );

    let path_output = _path.join(process.cwd(), output.path);

    try {
      if (!_fs.existsSync(path_output))
        _fs.mkdirSync(path_output, { recursive: true });
    } catch (e) {
      throw new Error(`can't create path of folders`);
    }

    let pathFile = _path.join(path_output, output.filename);
    _fs.writeFileSync(pathFile, JSON.stringify(result, null, pretty ? 2 : 0));

    console.log(`create file ${output.filename}`);
  }

  private static textToBase64(text: string, each: number): string {
    for (let i = 1; i <= each; i++) {
      text = Buffer.from(text).toString("base64");
    }
    return text;
  }

  private static base64ToText(text: string, each: number): string {
    for (let i = 1; i <= each; i++) {
      text = Buffer.from(text, "base64").toString();
    }
    return text;
  }

  public static cryptoEncrypt(
    text: string,
    crypto: CryptoConfiguration
  ): string {
    const { algorithm = "AES", key, expired = null } = crypto;
    let cipher = _cryptoJS[algorithm].encrypt(text, key);

    return cipher.toString();
  }

  public static cryptoDecrypt(
    encrypted: string,
    key: string,
    algorithm: string = "AES"
  ): string {
    let bytes = _cryptoJS[algorithm].decrypt(encrypted, key);
    let decrypted = bytes.toString(_cryptoJS.enc.Utf8);

    return decrypted;
  }

  public static basicEncrypt(text: string, config: Configuration) {
    const { level = 1 } = config;
    let formats: DynamicObject = Formatter.create();
    let hash: string = text
      .split("")
      .map((char) => formats[char] || " ")
      .join("");

    let result: Result = {
      hash: Encryptor.textToBase64(hash, level),
      level: level,
      formats: formats,
      date: now(),
    };

    Encryptor.decryptorGenerate(result, config);
    return result;
  }

  public static encrypt(text: string, config: Configuration): Result | string {
    let chars = text.split("");
    let { level = 1, crypto = null } = config;

    if (crypto) return Encryptor.cryptoEncrypt(text, crypto);
    else return Encryptor.basicEncrypt(text, config);
  }

  public static decrypt(
    text: string,
    decryptor: DecryptorFile | string
  ): string {
    if (typeof decryptor === "string")
      return Encryptor.cryptoDecrypt(text, decryptor);

    let { formats, level } = decryptor;
    let base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    let res: string = Encryptor.base64ToText(text, level);
    let isValid: boolean = base64regex.test(text);

    if (!formats || !level)
      throw new Error("failed, decryptor object is not valid !");
    if (!isValid) return text;
    for (let key in formats) {
      let format = formats[key];
      res = res.split(format).join(key);
    }

    return res;
  }
}

module.exports = Encryptor;
