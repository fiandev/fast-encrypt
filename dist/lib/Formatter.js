"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { random_item, shuffle, random_integer } = require("../utils/functions.js");
class Formatter {
    /* character result encrypted */
    static make(min = 3, max = 5, character = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_><][^¥€¢£∆¶×÷π√•|~%©®™°@#$&-+)(/?!;:*`) {
        let each = random_integer(min, max);
        let chars = character.split("");
        let res = "";
        for (let i = 0; i < each; i++)
            res += random_item(shuffle(chars));
        if (this.formats.includes(res)) {
            return Formatter.make(min, max, character);
        }
        else {
            this.formats.push(res);
            return res;
        }
    }
    static create(character = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$)(!?:][|/-*+%&,"'=><;.\n}{_ `) {
        let chars = character.split("");
        let res = {};
        for (let key of chars) {
            let format = Formatter.make(5, 5);
            res[key] = format;
        }
        return res;
    }
}
Formatter.formats = [];
module.exports = Formatter;
//# sourceMappingURL=Formatter.js.map