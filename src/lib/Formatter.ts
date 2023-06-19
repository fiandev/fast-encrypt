import { random_item, shuffle, random_integer } from "@/utils/functions.js";
import type { DynamicObject } from "@/types";

export default class Formatter {
  private static formats: string[] = [];

  /* character result encrypted */
  private static make(
    min: number = 3,
    max: number = 5,
    character: string = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_><][^¥€¢£∆¶×÷π√•|~%©®™°@#$&-+)(/?!;:*`
  ): string {
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

  public static create(
    character: string = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$)(!?:][|/-*+%&,"'=><;.\n}{_ `
  ): DynamicObject {
    let chars: string[] = character.split("");
    let res: DynamicObject = {};

    for (let key of chars) {
      let format: string = Formatter.make(5, 5);
      res[key] = format;
    }

    return res;
  }
}
