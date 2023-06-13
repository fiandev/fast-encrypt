import type { DynamicObject } from "./";

export type Result = {
  level: number;
  hash: string;
  formats?: DynamicObject;
  date: string;
  chiper?: string;
};

export type Output = {
  path: string;
  filename: string;
};

export type CryptoConfiguration = {
  key: string;
  algorithm?: string;
  expired?: Date | string;
};

export type Configuration = {
  level?: number;
  output?: Output;
  pretty?: boolean;
  crypto?: CryptoConfiguration;
};

export type DecryptorFile = {
  level: number;
  hash: string;
  formats: DynamicObject;
  date: string;
};

export interface EncryptorInterface {
  decryptorGenerate: Function;
  encrypt: Function;
  decrypt: Function;
  cryptoEncrypt: Function;
  cryptoDecrypt: Function;
  textToBase64: Function;
  base64ToText: Function;
}
