# Evaluable

A tiny library to compare objects as values in ECMAScript

## Installation

Use the npm package manager to install Evaluable.

```bash
npm i evaluable
```

## Usage

Evaluable provides a function compare equality of anything in ECMAScript as a
value. It is similar to the [“same-value-zero” algorithm][same-value-zero],
which is used in collections such as [`Set`][Set] and [`Map`][Map], but it
considers the methods `equals` or overwritten `valueOf`. See the API bellow to
check every rule.

```js
import { is } from 'evaluable';

is(null, undefined) // returns false

is(null, null) // returns true

is(null, '') // returns false

is(+0, -0) // returns true

is(NaN, NaN) // returns true

is(new Date(0), new Date(0)) // returns true

is(new Number(2), new Number(2)) // returns true
```

You can also create custom classes with the `equals` method, and the `is`
function will call it.

```js

import { is } from 'evaluable';

class MyClass {
  constructor(value) {
    this.value = value;
  }

  equals(other) {
    return (
      (this === other) ||
      (other instanceof MyClass && this.value === other.value)
    );
  }
}

is(new MyClass(0), new MyClass(0)) // returns true

is(new MyClass(1), new MyClass(2)) // returns false
```

For TypeScript users, you can also import the `Evaluable<T>` interface to guide
the creation of objects that compared as values.

```typescript
import type { Evaluable } from 'evaluable';
import { is } from 'evaluable';
import { hash } from 'cruxhash';

class Point2D implements Evaluable {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(other: unknown): boolean {
    return (
      this === other ||
      (other !== null &&
        other instanceof Point2D &&
        this.hashCode() === other.hashCode() &&
        this.x === other.x &&
        this.y === other.y)
    );
  }

  hashCode(): number {
    return hash(this);
  }
}

const a = new Point2D(3, 4);
const b = new Point2D(5, 12);
const c = new Point2D(3, 4);

is(a, b) // returns false
is(a, c) // returns true
is(b, c) // returns false

```

To ensure compatibility with [Immutable.js][Immutable], the `Evaluable<T>`
interface will enforce the implementation of the `hashCode` method. You can use
the [CRUXHash][CRUXHash] library to easily create hashes from objects.

## API

### `is(a: unknown, b: unknown)`

Returns true if the inputs have the same value, false otherwise.

Two inputs, `a` and `b`, have the same value if:

- Both are `undefined`;
- Both are `null`;
- Both are true or both false;
- Both are strings of same length with the same sequence of characters;
- Both are numbers and both are `NaN` or both are equals;
- Both are objects and:
  - have the `equals` method and `a.equals(b)` returns true;
  - have the `valueOf` overwritten and `is(a.valueOf(), b.valueOf())` returns
    true;
  - are the same object, i.e., both references the same memory address.

This function differs from:

- the [`==` operator][==] because it does not perform a type conversion when
  comparing the inputs;
- the [`===` operator][===] because it returns true when comparing `NaN` with
  itself;
- the [`Object.is` method][Object.is] because it returns true when comparing
  `+0` and `-0`;
- the [“same-value-zero” algorithm][same-value-zero], which is used in
  collections such as [`Set`][Set] and [`Map`][Map], because it considers the
  results of `equals` and overwritten `valueOf` methods.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://maxroecker.mit-license.org/)

[same-value-zero]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality

[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

[Immutable]: https://immutable-js.github.io/immutable-js/

[CRUXHash]: https://github.com/MaxRoecker/cruxhash

[==]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality

[===]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality

[Object.is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_ObjectsObject/is
