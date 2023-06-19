"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = exports.random_item = exports.random_integer = exports.shuffle = void 0;
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
//# sourceMappingURL=functions.js.map