import { Twig } from "../src";

let twig: Twig | undefined;

beforeEach(() => {
  twig = new Twig();
});

afterEach(() => {
  twig = undefined;
});

describe("Test thrown exceptions", () => {
  it("throws a message if the divider is zero", () => {
    expect(() => {
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0);
    }).toThrow("The divider must be a positive integer greater than zero.");
  });

  it("throws a message if the divider is less than zero", () => {
    expect(() => {
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], -1);
    }).toThrow("The divider must be a positive integer greater than zero.");
  });

  it("throws a message if the divider is irrational number", () => {
    expect(() => {
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1.234);
    }).toThrow("The divider must be a positive integer greater than zero.");
  });

  it("throws a message if the divider is greater than array length", () => {
    expect(() => {
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11);
    }).toThrow("The divider cannot be greater than the length of the array.");
  });
});

describe("Test arrays split by EVEN divider", () => {
  it("Even array, even divider", () => {
    expect(
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)
    ).toEqual([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ]);
  });

  it("Even array, even divider", () => {
    expect(
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8)
    ).toEqual([[1], [2], [3], [4], [5], [6], [7], [8, 9, 10]]);
  });

  it("Odd array, even divider", () => {
    expect(twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([
      [1, 2, 3],
      [4, 5, 6, 7],
    ]);
  });
});

describe("Test arrays split by ODD divider", () => {
  it("Even array with divider of one", () => {
    expect(
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)
    ).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
  });

  it("Even array, odd divider", () => {
    expect(
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)
    ).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9, 10],
    ]);
  });

  it("Even array, odd divider", () => {
    expect(
      twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
    ).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
  });

  it("Odd array, odd divider", () => {
    expect(twig?.groupArrayElements([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ]);
  });
});

describe("Test arrays of different TYPES", () => {
  it("works with array of strings", () => {
    expect(twig?.groupArrayElements(["a", "b", "c", "d", "e", "f"], 2)).toEqual(
      [
        ["a", "b", "c"],
        ["d", "e", "f"],
      ]
    );
  });

  it("works with array of objects", () => {
    expect(twig?.groupArrayElements([{}, {}, {}, {}, {}, {}], 2)).toEqual([
      [{}, {}, {}],
      [{}, {}, {}],
    ]);
  });

  it("works with array of arrays", () => {
    expect(twig?.groupArrayElements([[], [], [], [], [], []], 3)).toEqual([
      [[], []],
      [[], []],
      [[], []],
    ]);
  });
});
