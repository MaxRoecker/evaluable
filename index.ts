/**
 * An interface to represent objects as values. Implement this interface to
 * compare objects as values with the function `is`.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface Evaluable<T = Object> {
  /**
   * Returns true if this object is equal to other as a value, false otherwise.
   * If implemented, will be used by the function `is`.
   */
  equals(other: unknown): boolean;

  /**
   * Returns a hash for the object. It's used to quickly differentiate objects.
   * It's recommended to return an unsigned integer as result.
   *
   * Remember: If two objects have the same `hashCode`, they are
   * [not guaranteed to be equal][Hash Collision]. But, if two objects have
   * different `hashCode`, they must not be equal.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;

  /**
   * Returns a value of the object.
   *
   * By default, the `valueOf` method is inherited by every object descended
   * from `Object`. If an object has no primitive value, `valueOf` returns the
   * object itself. It will be used by the function `is` if overwritten.
   */
  valueOf(): T;
}

/**
 * Returns true if the inputs have the same value, false otherwise.
 *
 * Two inputs, `a` and `b`, have the same value if:
 *
 * - Both are `undefined`;
 * - Both are `null`;
 * - Both are true or both false;
 * - Both are strings of same length with the same sequence of characters;
 * - Both are numbers and both are `NaN` or both are equals;
 * - Both are objects and:
 *   - have the `equals` method and `a.equals(b)` returns true;
 *   - have the `valueOf` overwritten and `is(a.valueOf(), b.valueOf())` returns
 *     true;
 *   - are the same object, i.e., both references the same memory address.
 *
 * This function differs from:
 *
 * - the [`==` operator][==] because it does not perform a type conversion when
 *   comparing the inputs;
 * - the [`===` operator][===] because it returns true when comparing `NaN` with
 *   itself;
 * - the [`Object.is` method][Object.is] because it returns true when comparing
 *   `+0` and `-0`;
 * - the [“same-value-zero” algorithm][same-value-zero], which is used in
 *   collections such as [`Set`][Set] and [`Map`][Map], because it considers the
 *   results of `equals` and overwritten `valueOf` methods.
 *
 * [==]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
 * [===]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
 * [Object.is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * [same-value-zero]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
 * [Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * [Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
export const is = (a: unknown, b: unknown): boolean => {
  // Checks if both are numbers
  if (typeof a === 'number' && typeof b === 'number') {
    return (Number.isNaN(a) && Number.isNaN(b)) || a === b;

    // Checks if both are objects or null
  } else if (typeof a === 'object' && typeof b === 'object') {
    // Checks if both are null
    if (a === null || b === null) {
      return a === b;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const aobj: any = a;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bobj: any = b;

      // Checks if both have the equals method.
      if (
        typeof aobj.equals === 'function' &&
        typeof bobj.equals === 'function'
      ) {
        return aobj.equals(bobj);

        // Checks if both have the overwritten valueOf method
      } else if (
        typeof aobj.valueOf === 'function' &&
        aobj.valueOf !== Object.prototype.valueOf &&
        typeof bobj.valueOf === 'function' &&
        bobj.valueOf !== Object.prototype.valueOf
      ) {
        return is(aobj.valueOf(), bobj.valueOf());
      } else {
        return Object.is(aobj, bobj);
      }
    }
  } else {
    return Object.is(a, b);
  }
};
