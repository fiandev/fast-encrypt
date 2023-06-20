export function shuffle(array: any[]): any[] {
  let currentIndex: number = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function random_integer(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function random_item(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function now(): string {
  return new Date().toLocaleString();
}

/*
 * sprintf function
 * %s for replace string
 * %d for replace number
 */
export function sprintf(
  input: string,
  ...replacements: string[] | number[]
): string {
  const exp = /(\%(s|d))/gm;
  let splits: any[] = input.split(/(%s|%d)/gm);
  let types = {
    "%d": "number",
    "%s": "string",
  };

  let counter = 0;
  for (let i = 0; i < splits.length; i++) {
    let item = splits[i];
    let replacement = replacements[counter];

    if (!exp.test(item)) continue;
    Object.keys(types).map((key) => {
      if (item.search(key) === -1) return;

      let type = types[key as keyof typeof types];
      if (typeof replacement !== type)
        throw new Error(
          `${item} can only replaced with type '${type}' but '${typeof replacement}' given`
        );
      else splits[i] = replacement;

      counter++;
    });
  }

  return splits.join("");
}
