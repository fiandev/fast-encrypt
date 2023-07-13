const _fs = require("fs");
const _path = require("path");
const _cryptoJS = require("crypto-js");

import Formatter from "./Formatter";
import { now, sprintf } from "../utils/functions";

import type {
  Result,
  Output,
  Configuration,
  DecryptorFile,
  DynamicObject,
  CryptoConfiguration,
} from "@/types";

export default class Encryptor {
  private static formats: DynamicObject;
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
    let extension = _path.extname(output.filename);
    if (!supported_extension.includes(extension))
      throw new Error(
        sprintf(
          "Unsupported extension for decryptor file expected %s, but '%s' given",
          supported_extension.toString(),
          extension
        )
      );
    let path_output = _path.join(process.cwd(), output.path);

    try {
      if (!_fs.existsSync(path_output))
        _fs.mkdirSync(path_output, { recursive: true });
    } catch (e) {
      throw new Error(`can't create path of folders`);
    }
    /*
     * delete unused attribute
     */
    let unUsedAttribute = ["hash"];
    unUsedAttribute.forEach(
      (attr) => delete result[attr as keyof typeof result]
    );

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
    let cipher = _cryptoJS[algorithm as keyof typeof _cryptoJS].encrypt(
      text,
      key
    );

    return cipher.toString();
  }

  public static cryptoDecrypt(
    encrypted: string,
    key: string,
    algorithm: string = "AES"
  ): string {
    let bytes = _cryptoJS[algorithm as keyof typeof _cryptoJS].decrypt(
      encrypted,
      key
    );
    let decrypted = bytes.toString(_cryptoJS.enc.Utf8);

    return decrypted;
  }

  public static basicEncrypt(text: string, config: Configuration) {
    const { level = 1 } = config;
    let formats: DynamicObject =
      this.formats.length > 0 ? this.formats : Formatter.create();
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

    if (config.output) Encryptor.decryptorGenerate(result, config);
    return result;
  }

  public static encrypt(
    input: string | string[],
    config: Configuration
  ): Result | string {
    const entities: string[] = [];
    const result: any[] = [];

    if (!Array.isArray(input) && typeof input === "string") {
      entities.push(input);
    } else {
      this.formats = Formatter.create();
      input.map((item) => entities.push(item));
    }

    for (let text of entities) {
      let chars: string[] = text.split("");
      let { level = 1, crypto = null } = config;

      if (text.length > 1000 && level > 3)
        throw new Error(
          `Maximum level exceeded, maximum level is 3 but given ${level}`
        );
      if (level > 5)
        throw new Error(
          `Maximum level exceeded, maximum level is 5 but given ${level}`
        );

      if (crypto) result.push(Encryptor.cryptoEncrypt(text, crypto));
      else result.push(Encryptor.basicEncrypt(text, config));
    }

    return result.length < 1 ? result[0] : result;
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

    if (!formats && !level)
      throw new Error("failed, decryptor object is not valid !");
    if (!isValid) return text;
    for (let key in formats) {
      let format: string = formats[key];
      res = res.split(format).join(key);
    }

    return res;
  }
}
