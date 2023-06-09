const { random_item, shuffle, random_integer } = require("../utils/functions.js");
import type { DynamicObject } from "../types";

class Formatter {
  public static formats: any[] = []
  
  /* character result encrypted */
  private static make (min: number = 3, max: number = 5, character: string = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_><][^¥€¢£∆¶×÷π√•|~%©®™°@#$&-+)(/?!;:*`): string {
    let each = random_integer(min, max);
    let chars = character.split("");
    let res = "";
    
    for (let i = 0; i < each; i++) res += random_item(shuffle(chars));
    
    if (this.formats.includes(res)) {
      return Formatter.make(min, max, character);
    } else {
      this.formats.push(res);
      return res;
    }
  }
  
  public static create (character: string = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$)(!?:][|/-*+%&,"'=><;.\n}{_ `): DynamicObject {
    let chars = character.split("");
    let res: DynamicObject = {};
    
    for (let key of chars) {
      let format = Formatter.make(5, 5);
      res[key] = format;
    }
    
    return res;
  }
}

module.exports = Formatter;