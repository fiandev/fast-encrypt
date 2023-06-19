"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _fs = require("fs");
var _path = require("path");
var _cryptoJS = require("crypto-js");
var Formatter_1 = require("@/lib/Formatter");
var functions_1 = require("@/utils/functions");
var Encryptor = (function () {
    function Encryptor() {
    }
    Encryptor.decryptorGenerate = function (result, config) {
        var defaultOutput = {
            path: "./",
            filename: "decryptor.json",
        };
        var _a = config.output, output = _a === void 0 ? defaultOutput : _a, _b = config.pretty, pretty = _b === void 0 ? true : _b;
        var supported_extension = [".json"];
        if (!output)
            return;
        var ext = _path.extname(output.filename);
        if (!supported_extension.includes(ext))
            throw new Error("Unsupported extension for decryptor file expected [".concat(supported_extension
                .toString()
                .replace(",", "|"), "]"));
        var path_output = _path.join(process.cwd(), output.path);
        try {
            if (!_fs.existsSync(path_output))
                _fs.mkdirSync(path_output, { recursive: true });
        }
        catch (e) {
            throw new Error("can't create path of folders");
        }
        var pathFile = _path.join(path_output, output.filename);
        _fs.writeFileSync(pathFile, JSON.stringify(result, null, pretty ? 2 : 0));
        console.log("create file ".concat(output.filename));
    };
    Encryptor.textToBase64 = function (text, each) {
        for (var i = 1; i <= each; i++) {
            text = Buffer.from(text).toString("base64");
        }
        return text;
    };
    Encryptor.base64ToText = function (text, each) {
        for (var i = 1; i <= each; i++) {
            text = Buffer.from(text, "base64").toString();
        }
        return text;
    };
    Encryptor.cryptoEncrypt = function (text, crypto) {
        var _a = crypto.algorithm, algorithm = _a === void 0 ? "AES" : _a, key = crypto.key, _b = crypto.expired, expired = _b === void 0 ? null : _b;
        var cipher = _cryptoJS[algorithm].encrypt(text, key);
        return cipher.toString();
    };
    Encryptor.cryptoDecrypt = function (encrypted, key, algorithm) {
        if (algorithm === void 0) { algorithm = "AES"; }
        var bytes = _cryptoJS[algorithm].decrypt(encrypted, key);
        var decrypted = bytes.toString(_cryptoJS.enc.Utf8);
        return decrypted;
    };
    Encryptor.basicEncrypt = function (text, config) {
        var _a = config.level, level = _a === void 0 ? 1 : _a;
        var formats = Formatter_1.default.create();
        var hash = text
            .split("")
            .map(function (char) { return formats[char] || " "; })
            .join("");
        var result = {
            hash: Encryptor.textToBase64(hash, level),
            level: level,
            formats: formats,
            date: (0, functions_1.now)(),
        };
        Encryptor.decryptorGenerate(result, config);
        return result;
    };
    Encryptor.encrypt = function (text, config) {
        var chars = text.split("");
        var _a = config.level, level = _a === void 0 ? 1 : _a, _b = config.crypto, crypto = _b === void 0 ? null : _b;
        if (text.length > 1000 && level > 3)
            throw new Error("Maximum level exceeded, maximum level is 3 but given ".concat(level));
        if (level > 5)
            throw new Error("Maximum level exceeded, maximum level is 5 but given ".concat(level));
        if (crypto)
            return Encryptor.cryptoEncrypt(text, crypto);
        else
            return Encryptor.basicEncrypt(text, config);
    };
    Encryptor.decrypt = function (text, decryptor) {
        if (typeof decryptor === "string")
            return Encryptor.cryptoDecrypt(text, decryptor);
        var formats = decryptor.formats, level = decryptor.level;
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        var res = Encryptor.base64ToText(text, level);
        var isValid = base64regex.test(text);
        if (!formats || !level)
            throw new Error("failed, decryptor object is not valid !");
        if (!isValid)
            return text;
        for (var key in formats) {
            var format = formats[key];
            res = res.split(format).join(key);
        }
        return res;
    };
    return Encryptor;
}());
exports.default = Encryptor;
//# sourceMappingURL=Encryptor.js.map