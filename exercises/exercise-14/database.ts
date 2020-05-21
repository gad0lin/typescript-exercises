import { OnReadOpts } from "net";
import { readFile } from "fs";
import { fs } from "mz";

type ExtractKeysOfValueType<T, K> = {
  [I in keyof T]: T[I] extends K ? I : never;
}[keyof T];

type Sort<T> = { [key in ExtractKeysOfValueType<T, string | number>]?: -1 | 1 };

type Projection<T> = { [key in keyof T]?: 1 };
type Options<T> = {
  sort?: Sort<T>;
  projection?: Projection<T>;
};

export class Database<T> {
  protected filename: string;
  protected fullTextSearchFieldNames: Array<ExtractKeysOfValueType<T, string>>;

  private records: T[];
  constructor(
    filename: string,
    fullTextSearchFieldNames: Array<ExtractKeysOfValueType<T, string>>
  ) {
    this.filename = filename;
    this.fullTextSearchFieldNames = fullTextSearchFieldNames;
    this.records = this.readFile();
  }

  async find(query: ConditionX<T>, options?: Options<T>): Promise<Partial<T>[]> {
    let records : T[] = this.records.filter((e) => this.match(query, e));
    if (options) {
        const projection = options.projection;
        const sort = options.sort
        if (sort) {
            this.sort(records, sort);
     }
      if ("projection" in options &&  projection !== undefined) {
        return records.map((r) => this.projection(r, projection));
      }
    }
    return records;
  }

  // I wish I could tie result to projection passed in K type
  projection<K extends Projection<T>>(element: T, projection: K) : Partial<T> {
    let keys = Object.keys(projection) as Array<keyof T>;

    let projectionResult : Partial<T> = {};
    for (let key of keys) {
        projectionResult[key] = element[key]
    }
    return projectionResult;
  }

  sort(elements: T[], options: Sort<T>) {
    let sortKeysArr = Object.keys(options) as Array<ExtractKeysOfValueType<T, string | number>>;
    let invertedArr = sortKeysArr.reverse();
    for (let sortOption of invertedArr) {
      elements.sort((e1: T, e2: T) => {
        let v1 = e1[sortOption];
        let v2 = e2[sortOption];
        if (v1 === v2) {
          return 0;
        }
        let a = options[sortOption] as number;
        return v1 < v2 ? -a : a;
      });
    }
  }

  match(query: ConditionX<T>, element: T): boolean {
    let match = false;
    if ("$and" in query) {
      let what = query.$and;
      match = this.match(what[0], element) && this.match(what[1], element);
    } else if ("$text" in query) {
      let matchText = query.$text;
      let matchWords = matchText.toLowerCase().split(" ");

      let matchCount: { [key: string]: number } = {};
      for (let word of matchWords) {
        matchCount[word] = 0;
      }

      for (let key of this.fullTextSearchFieldNames) {
        // TODO: ?!?! ugly but couldn't make it work and be interpreted as string
        let keyContent = String(element[key]);

        let keyContentWords = keyContent.toLowerCase().split(" ");

        for (let matchWord of matchWords) {
          if (keyContentWords.includes(matchWord)) {
            matchCount[matchWord] += 1;
          }
        }
      }

      for (let word of matchWords) {
        if (matchCount[word] === 0) {
          return false;
        }
      }
      return true;
    } else if ("$or" in query) {
      let what = query.$or;
      match = this.match(what[0], element) || this.match(what[1], element);
    } else {
      match = true;
      for (let field in query) {
        let test = query[field];
        const propertyValue = element[field];
        if ("$in" in test) {
          let values = test.$in;
          const keyValue = element[field];
          match = match && values.includes(keyValue);
        }
        if ("$eq" in test) {
          let value = test.$eq;
          match = match && propertyValue === value;
        }
        if ("$gt" in test) {
          let value = test.$gt;
          match = match && propertyValue > value;
        }
        if ("$gte" in test) {
          let value = test.$gte;
          match = match && propertyValue >= value;
        }
        if ("$lt" in test) {
          let value = test.$lt;
          match = match && propertyValue < value;
        }
        if ("$lte" in test) {
          let value = test.$lte;
          match = match && propertyValue < value;
        }
      }
    }
    return match;
  }

  readFile(): Array<T> {
    const entryLines = fs
      .readFileSync(this.filename)
      .toString()
      .split("\n")
      .filter((s) => !s.match(/^D/) && !s.match(/^[\s]*$/))
      .map((s) => s.substr(1));
    const entries: Array<T> = [];
    for (let el of entryLines) {
      console.log("zz" + el);
      const entrie = JSON.parse(el) as T;
      entries.push(entrie);
    }

    return entries;
  }
}

type EqTest<K> = {
  $eq: K;
};

type LtTest<K> = {
  $lt: K;
};

type LteTest<K> = {
  $lte: K;
};

type GtTest<K> = {
  $gt: K;
};

type GteTest<K> = {
  $gte: K;
};

type Test<T> =
  | LtTest<T>
  | EqTest<T>
  | LteTest<T>
  | GtTest<T>
  | GteTest<T>
  | InTest<T>;

type InTest<K> = {
  $in: Array<K>;
};
type TextCondition = {
  $text: string;
};

type SimpleFieldTest<T> =
  | { [field in keyof T]?: Test<T[field]> }
  | TextCondition;

type And<T> = { [K in "$and"]: Array<SimpleFieldTest<T>> };
type Or<T> = { [K in "$or"]: Array<SimpleFieldTest<T>> };
type ConditionX<T> = And<T> | Or<T> | TextCondition | SimpleFieldTest<T>;
