"use strict";
function shuffle(array) {
    var _a;
    var currentIndex = array.length;
    var randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function random_integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random_item(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function now() {
    return new Date().toLocaleString();
}
module.exports = {
    shuffle: shuffle,
    random_item: random_item,
    random_integer: random_integer,
    now: now,
};
//# sourceMappingURL=functions.js.map