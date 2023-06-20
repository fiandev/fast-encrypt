import type { Result, Configuration, DecryptorFile, CryptoConfiguration } from "@/types";
export default class Encryptor {
    private static formats;
    private static decryptorGenerate;
    private static textToBase64;
    private static base64ToText;
    static cryptoEncrypt(text: string, crypto: CryptoConfiguration): string;
    static cryptoDecrypt(encrypted: string, key: string, algorithm?: string): string;
    static basicEncrypt(text: string, config: Configuration): Result;
    static encrypt(input: string | string[], config: Configuration): Result | string;
    static decrypt(text: string, decryptor: DecryptorFile | string): string;
}
