"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("../utils/functions.js"), random_item = _a.random_item, shuffle = _a.shuffle, random_integer = _a.random_integer;
var Formatter = /** @class */ (function () {
    function Formatter() {
    }
    /* character result encrypted */
    Formatter.make = function (min, max, character) {
        if (min === void 0) { min = 3; }
        if (max === void 0) { max = 5; }
        if (character === void 0) { character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_><][^\u00A5\u20AC\u00A2\u00A3\u2206\u00B6\u00D7\u00F7\u03C0\u221A\u2022|~%\u00A9\u00AE\u2122\u00B0@#$&-+)(/?!;:*"; }
        var each = random_integer(min, max);
        var chars = character.split("");
        var res = "";
        for (var i = 0; i < each; i++)
            res += random_item(shuffle(chars));
        if (this.formats.includes(res)) {
            return Formatter.make(min, max, character);
        }
        else {
            this.formats.push(res);
            return res;
        }
    };
    Formatter.create = function (character) {
        if (character === void 0) { character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$)(!?:][|/-*+%&,\"'=><;.\n}{_ "; }
        var chars = character.split("");
        var res = {};
        for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
            var key = chars_1[_i];
            var format = Formatter.make(5, 5);
            res[key] = format;
        }
        return res;
    };
    Formatter.formats = [];
    return Formatter;
}());
module.exports = Formatter;
//# sourceMappingURL=Formatter.js.map