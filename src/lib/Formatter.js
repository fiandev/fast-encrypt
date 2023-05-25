const { random_item, shuffle, random_integer } = require("../utils/functions.js");

class Formatter {
  static formats = []
  
  static make (min = 3, max = 5, character = "abcdefghijklmnopqrstuvwxyz0123456789") {
    let each = random_integer(min, max);
    let chars = character.split("");
    let res = "";
    
    for (let i = 0; i < each; i++) res += random_item(shuffle(chars));
    
    if (this.formats.includes(res)) {
      return this.formats.includes(res);
    } else {
      this.formats.push(res);
      return res;
    }
  }
  
  static create ({ character = "abcdefghijklmnopqrstuvwxyz0123456789 " }) {
    let chars = character.split("");
    let res = {};
    
    for (let key of chars) {
      let format = Formatter.make(5, 8);
      res[key] = format;
    }
    
    return res;
  }
}

module.exports = Formatter;