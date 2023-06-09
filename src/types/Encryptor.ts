import type { DynamicObject } from "./";

type Result = {
  level: number;
  hash: string;
  formats: DynamicObject;
  date: string;
}

type Output = {
  path: string;
  filename: string;
}

type Configuration = {
  level?: number;
  output?: Output;
  pretty?: boolean;
}

type EncryptorFile = {
  level: number;
  hash: string;
  formats: DynamicObject;
  date: string;
}

interface Encryptor {
  generate_decryptor: Function;
  encrypt: Function;
  decrypt: Function;
}


export {
  Result,
  Configuration,
  Encryptor,
  EncryptorFile
}