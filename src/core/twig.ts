/* 
    Given an array of length >= 0, and a positive integer N, return the 
    contents of the array divided into N equally sized arrays.

    Where the size of the original array cannot be divided equally by N, 
    the final part should have a length equal to the remainder.

 */

import { ITwig } from "./types";

export class Twig implements ITwig {
  groupArrayElements<T>(arr: T[], divider: number): T[][] | void {
    let finalArr: T[][] = [];
    try {
      let counter: number;
      let elementsPerArr: number;

      if (!Number.isInteger(divider) || divider <= 0) {
        throw new Error(
          "The divider must be a positive integer greater than zero."
        );
      }

      if (divider > arr.length) {
        throw new Error(
          "The divider cannot be greater than the length of the array."
        );
      }

      counter = divider;
      elementsPerArr = Math.floor(arr.length / divider);

      while (counter > 0) {
        finalArr.push(arr.splice(0, elementsPerArr));
        counter--;
      }

      if (arr.length > 0) {
        finalArr.at(-1)?.push(...arr);
      }
    } catch (error) {
      throw new Error((error as { message: string }).message);
    }

    return finalArr;
  }
}
