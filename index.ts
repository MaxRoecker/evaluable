/**
 * Returns true if the inputs have the same value, false otherwise.
 *
 * Two inputs, `a` and `b`, have the same value if:
 *
 * - Both are `undefined`;
 * - Both are `null`;
 * - Both are `true` or both `false`;
 * - Both are strings with same length and with the same sequence of code points
 *   in the [Unicode Normalized form][NormalForm];
 * - Both are numbers and:
 *   - both are `NaN`;
 *   - both are `Infinite` or both are `-Infinite`;
 *   - both are equals by some `delta` tolerance. Default: `Number.EPSILON`.
 * - Both are objects and:
 *   - have the `equals` method and `a.equals(b)` returns true;
 *   - have the `valueOf` method overwritten and `is(a.valueOf(), b.valueOf())`
 *     returns true;
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
 * - the [`Immutable.is`][Immutable.is] method because it only considers the
 *   results of `equals` methods and does not check the `delta` tolerance when
 *   comparing numbers.
 *
 * [NormalForm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 * [==]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
 * [===]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
 * [Object.is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * [same-value-zero]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
 * [Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * [Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * [Immutable.is]: https://immutable-js.github.io/immutable-js/docs/#/is
 *
 * @param a an input
 * @param b another input
 * @param delta the minimum difference between two numbers
 * @returns `true` if the inputs have the same value, `false` otherwise.
 */
export const is = (a: unknown, b: unknown, delta = Number.EPSILON): boolean => {
  // Checks if both are numbers
  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isFinite(a) && Number.isFinite(b)) {
      return Math.abs(a - b) < delta;
    } else {
      return Object.is(a, b);
    }

    // Checks if both are strings
  } else if (typeof a === 'string' && typeof b === 'string') {
    return Object.is(a.normalize('NFD'), b.normalize('NFD'));

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

        // Checks if both are the same reference
      } else {
        return Object.is(aobj, bobj);
      }
    }

    // Otherwise, defaults to Object.is
  } else {
    return Object.is(a, b);
  }
};

/**
 * An interface to represent objects as values. Implement this interface to
 * compare objects as values with the function `is`.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface Evaluable<T = Object> {
  /**
   * Returns true if this object is equal to other as a value, false otherwise.
   * If implemented, will be used by the function `is`.
   *
   * @param other some other value to be compared.
   * @returns `true` if the objects are equal, `false` otherwise.
   */
  equals(other: unknown): boolean;

  /**
   *
   * Returns a hash for the object. It's used to quickly differentiate objects.
   * It's recommended to return an unsigned integer as result.
   *
   * Remember: If two objects have the same `hashCode`, they are
   * [not guaranteed to be equal][Hash Collision]. But, if two objects have
   * different `hashCode`, they must not be equal.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   *
   * @returns the hash code of the object
   */
  hashCode(): number;

  /**
   * Returns a value of the object.
   *
   * By default, the [`valueOf` method][valueOf] is inherited by every object
   * descended from `Object`. If an object has no primitive value, `valueOf`
   * returns the object itself.
   *
   * You can use valueOf within your own code to convert a built-in object into
   * a primitive value. When you create a custom object, you can override
   * `Object.prototype.valueOf` to call a custom method instead of the default
   * `Object` method.
   *
   * It will be used by the function `is` if overwritten.
   *
   * [valueOf]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
   *
   * @returns the primitive value of the specified object.
   */
  valueOf(): T;
}
