"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprintf = exports.now = exports.random_item = exports.random_integer = exports.shuffle = void 0;
function shuffle(array) {
    var _a;
    var currentIndex = array.length;
    var randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
exports.shuffle = shuffle;
function random_integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.random_integer = random_integer;
function random_item(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.random_item = random_item;
function now() {
    return new Date().toLocaleString();
}
exports.now = now;
function sprintf(input) {
    var replacements = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        replacements[_i - 1] = arguments[_i];
    }
    var exp = /(\%(s|d))/gm;
    var splits = input.split(/(%s|%d)/gm);
    var types = {
        "%d": "number",
        "%s": "string",
    };
    var counter = 0;
    var _loop_1 = function (i) {
        var item = splits[i];
        var replacement = replacements[counter];
        if (!exp.test(item))
            return "continue";
        Object.keys(types).map(function (key) {
            if (item.search(key) === -1)
                return;
            var type = types[key];
            if (typeof replacement !== type)
                throw new Error("".concat(item, " can only replaced with type '").concat(type, "' but '").concat(typeof replacement, "' given"));
            else
                splits[i] = replacement;
            counter++;
        });
    };
    for (var i = 0; i < splits.length; i++) {
        _loop_1(i);
    }
    return splits.join("");
}
exports.sprintf = sprintf;
//# sourceMappingURL=functions.js.map