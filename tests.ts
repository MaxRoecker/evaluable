import { expect } from '@esm-bundle/chai';

import type { Evaluable } from './index';
import { is } from './index';

describe('is tests', () => {
  it('should return true for both null', () => {
    expect(is(null, null)).equal(true);
  });

  it('should return false for null and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(null, undefined)).equal(false);
    expect(is(null, false)).equal(false);
    expect(is(null, true)).equal(false);
    expect(is(null, +0)).equal(false);
    expect(is(null, -0)).equal(false);
    expect(is(null, Math.E)).equal(false);
    expect(is(null, -Math.E)).equal(false);
    expect(is(null, Infinity)).equal(false);
    expect(is(null, -Infinity)).equal(false);
    expect(is(null, NaN)).equal(false);
    expect(is(null, '')).equal(false);
    expect(is(null, 'abc')).equal(false);
    expect(is(null, [])).equal(false);
    expect(is(null, {})).equal(false);
    expect(is(null, epoch)).equal(false);
    expect(is(null, point)).equal(false);
  });

  it('should return true for both undefined', () => {
    expect(is(undefined, undefined)).equal(true);
  });

  it('should return false for undefined and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(undefined, null)).equal(false);
    expect(is(undefined, false)).equal(false);
    expect(is(undefined, true)).equal(false);
    expect(is(undefined, +0)).equal(false);
    expect(is(undefined, -0)).equal(false);
    expect(is(undefined, Math.E)).equal(false);
    expect(is(undefined, -Math.E)).equal(false);
    expect(is(undefined, Infinity)).equal(false);
    expect(is(undefined, -Infinity)).equal(false);
    expect(is(undefined, NaN)).equal(false);
    expect(is(undefined, '')).equal(false);
    expect(is(undefined, 'abc')).equal(false);
    expect(is(undefined, [])).equal(false);
    expect(is(undefined, {})).equal(false);
    expect(is(undefined, epoch)).equal(false);
    expect(is(undefined, point)).equal(false);
  });

  it('should return true for both true', () => {
    expect(is(true, true)).equal(true);
  });

  it('should return false for true and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(true, null)).equal(false);
    expect(is(true, undefined)).equal(false);
    expect(is(true, false)).equal(false);
    expect(is(true, +0)).equal(false);
    expect(is(true, -0)).equal(false);
    expect(is(true, Math.E)).equal(false);
    expect(is(true, -Math.E)).equal(false);
    expect(is(true, Infinity)).equal(false);
    expect(is(true, -Infinity)).equal(false);
    expect(is(true, NaN)).equal(false);
    expect(is(true, '')).equal(false);
    expect(is(true, 'abc')).equal(false);
    expect(is(true, [])).equal(false);
    expect(is(true, {})).equal(false);
    expect(is(true, epoch)).equal(false);
    expect(is(true, point)).equal(false);
  });

  it('should return true for both false', () => {
    expect(is(false, false)).equal(true);
  });

  it('should return false for false and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(false, null)).equal(false);
    expect(is(false, undefined)).equal(false);
    expect(is(false, true)).equal(false);
    expect(is(false, +0)).equal(false);
    expect(is(false, -0)).equal(false);
    expect(is(false, Math.E)).equal(false);
    expect(is(false, -Math.E)).equal(false);
    expect(is(false, Infinity)).equal(false);
    expect(is(false, -Infinity)).equal(false);
    expect(is(false, NaN)).equal(false);
    expect(is(false, '')).equal(false);
    expect(is(false, 'abc')).equal(false);
    expect(is(false, [])).equal(false);
    expect(is(false, {})).equal(false);
    expect(is(false, epoch)).equal(false);
    expect(is(false, point)).equal(false);
  });

  it('should return true for both NaN', () => {
    expect(is(NaN, NaN)).equal(true);
  });

  it('should return false for NaN and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(NaN, null)).equal(false);
    expect(is(NaN, undefined)).equal(false);
    expect(is(NaN, false)).equal(false);
    expect(is(NaN, true)).equal(false);
    expect(is(NaN, +0)).equal(false);
    expect(is(NaN, -0)).equal(false);
    expect(is(NaN, Math.E)).equal(false);
    expect(is(NaN, -Math.E)).equal(false);
    expect(is(NaN, Infinity)).equal(false);
    expect(is(NaN, -Infinity)).equal(false);
    expect(is(NaN, '')).equal(false);
    expect(is(NaN, 'abc')).equal(false);
    expect(is(NaN, [])).equal(false);
    expect(is(NaN, {})).equal(false);
    expect(is(NaN, epoch)).equal(false);
    expect(is(NaN, point)).equal(false);
  });

  it('should return true for both numbers with equal values', () => {
    expect(is(+0, +0)).equal(true);
    expect(is(+0, -0)).equal(true);
    expect(is(-0, +0)).equal(true);
    expect(is(-0, -0)).equal(true);
    expect(is(Math.E, Math.E)).equal(true);
    expect(is(-Math.E, -Math.E)).equal(true);
    expect(is(+Infinity, +Infinity)).equal(true);
    expect(is(-Infinity, -Infinity)).equal(true);
  });

  it('should return true for both numbers with difference within the delta', () => {
    expect(is(0.3, 0.1 + 0.2)).equal(true);
    expect(is(0.1 + 0.2, 0.3)).equal(true);
    expect(is(1000000.1 + 0.2, 1000000.3, 1e-6)).equal(true);
    expect(is(1000000.3, 1000000.1 + 0.2, 1e-6)).equal(true);
  });

  it('should return false for both numbers with different values', () => {
    expect(is(Math.E, -Math.E)).equal(false);
    expect(is(Math.E, +0)).equal(false);
    expect(is(Math.E, -0)).equal(false);
    expect(is(Math.E, +Infinity)).equal(false);
    expect(is(Math.E, -Infinity)).equal(false);
    expect(is(Math.E, NaN)).equal(false);

    expect(is(-Math.E, Math.E)).equal(false);
    expect(is(-Math.E, +0)).equal(false);
    expect(is(-Math.E, -0)).equal(false);
    expect(is(-Math.E, +Infinity)).equal(false);
    expect(is(-Math.E, -Infinity)).equal(false);
    expect(is(-Math.E, NaN)).equal(false);

    expect(is(+0, Math.E)).equal(false);
    expect(is(+0, -Math.E)).equal(false);
    expect(is(+0, +Infinity)).equal(false);
    expect(is(+0, -Infinity)).equal(false);
    expect(is(+0, NaN)).equal(false);

    expect(is(-0, Math.E)).equal(false);
    expect(is(-0, -Math.E)).equal(false);
    expect(is(-0, +Infinity)).equal(false);
    expect(is(-0, -Infinity)).equal(false);
    expect(is(-0, NaN)).equal(false);

    expect(is(+Infinity, Math.E)).equal(false);
    expect(is(+Infinity, -Math.E)).equal(false);
    expect(is(+Infinity, +0)).equal(false);
    expect(is(+Infinity, -0)).equal(false);
    expect(is(+Infinity, -Infinity)).equal(false);
    expect(is(+Infinity, NaN)).equal(false);

    expect(is(-Infinity, Math.E)).equal(false);
    expect(is(-Infinity, -Math.E)).equal(false);
    expect(is(-Infinity, +0)).equal(false);
    expect(is(-Infinity, -0)).equal(false);
    expect(is(-Infinity, +Infinity)).equal(false);
    expect(is(-Infinity, NaN)).equal(false);
  });

  it('should return false for a number and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(+0, null)).equal(false);
    expect(is(+0, undefined)).equal(false);
    expect(is(+0, false)).equal(false);
    expect(is(+0, true)).equal(false);
    expect(is(+0, '')).equal(false);
    expect(is(+0, 'abc')).equal(false);
    expect(is(+0, [])).equal(false);
    expect(is(+0, {})).equal(false);
    expect(is(+0, epoch)).equal(false);
    expect(is(+0, point)).equal(false);

    expect(is(-0, null)).equal(false);
    expect(is(-0, undefined)).equal(false);
    expect(is(-0, false)).equal(false);
    expect(is(-0, true)).equal(false);
    expect(is(-0, '')).equal(false);
    expect(is(-0, 'abc')).equal(false);
    expect(is(-0, [])).equal(false);
    expect(is(-0, {})).equal(false);
    expect(is(-0, epoch)).equal(false);
    expect(is(-0, point)).equal(false);

    expect(is(Math.E, null)).equal(false);
    expect(is(Math.E, undefined)).equal(false);
    expect(is(Math.E, false)).equal(false);
    expect(is(Math.E, true)).equal(false);
    expect(is(Math.E, '')).equal(false);
    expect(is(Math.E, 'abc')).equal(false);
    expect(is(Math.E, [])).equal(false);
    expect(is(Math.E, {})).equal(false);
    expect(is(Math.E, epoch)).equal(false);
    expect(is(Math.E, point)).equal(false);

    expect(is(-Math.E, null)).equal(false);
    expect(is(-Math.E, undefined)).equal(false);
    expect(is(-Math.E, false)).equal(false);
    expect(is(-Math.E, true)).equal(false);
    expect(is(-Math.E, '')).equal(false);
    expect(is(-Math.E, 'abc')).equal(false);
    expect(is(-Math.E, [])).equal(false);
    expect(is(-Math.E, {})).equal(false);
    expect(is(-Math.E, epoch)).equal(false);
    expect(is(-Math.E, point)).equal(false);

    expect(is(+Infinity, null)).equal(false);
    expect(is(+Infinity, undefined)).equal(false);
    expect(is(+Infinity, false)).equal(false);
    expect(is(+Infinity, true)).equal(false);
    expect(is(+Infinity, '')).equal(false);
    expect(is(+Infinity, 'abc')).equal(false);
    expect(is(+Infinity, [])).equal(false);
    expect(is(+Infinity, {})).equal(false);
    expect(is(+Infinity, epoch)).equal(false);
    expect(is(+Infinity, point)).equal(false);

    expect(is(-Infinity, null)).equal(false);
    expect(is(-Infinity, undefined)).equal(false);
    expect(is(-Infinity, false)).equal(false);
    expect(is(-Infinity, true)).equal(false);
    expect(is(-Infinity, '')).equal(false);
    expect(is(-Infinity, 'abc')).equal(false);
    expect(is(-Infinity, [])).equal(false);
    expect(is(-Infinity, {})).equal(false);
    expect(is(-Infinity, epoch)).equal(false);
    expect(is(-Infinity, point)).equal(false);
  });

  it('should return true for both strings with same sequence', () => {
    expect(is('', '')).equal(true);
    expect(is('abc', 'abc')).equal(true);
    expect(is('\u00F1', '\u00F1')).equal(true);
    expect(is('\u00F1', '\u006E\u0303')).equal(true);
    expect(is('\u006E\u0303', '\u00F1')).equal(true);
    expect(is('\u006E\u0303', '\u006E\u0303')).equal(true);
  });

  it('should return false for both strings with different sequences', () => {
    expect(is('', 'abc')).equal(false);
    expect(is('', '\u00F1')).equal(false);
    expect(is('', '\u006E\u0303')).equal(false);
    expect(is('abc', '')).equal(false);
    expect(is('abc', '\u00F1')).equal(false);
    expect(is('abc', '\u006E\u0303')).equal(false);
    expect(is('\u00F1', '')).equal(false);
    expect(is('\u00F1', 'abc')).equal(false);
    expect(is('\u006E\u0303', '')).equal(false);
    expect(is('\u006E\u0303', 'abc')).equal(false);
  });

  it('should return false for a string and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is('', null)).equal(false);
    expect(is('', undefined)).equal(false);
    expect(is('', false)).equal(false);
    expect(is('', true)).equal(false);
    expect(is('', +0)).equal(false);
    expect(is('', -0)).equal(false);
    expect(is('', Math.E)).equal(false);
    expect(is('', -Math.E)).equal(false);
    expect(is('', Infinity)).equal(false);
    expect(is('', -Infinity)).equal(false);
    expect(is('', NaN)).equal(false);
    expect(is('', [])).equal(false);
    expect(is('', {})).equal(false);
    expect(is('', epoch)).equal(false);
    expect(is('', point)).equal(false);

    expect(is('abc', null)).equal(false);
    expect(is('abc', undefined)).equal(false);
    expect(is('abc', false)).equal(false);
    expect(is('abc', true)).equal(false);
    expect(is('abc', +0)).equal(false);
    expect(is('abc', -0)).equal(false);
    expect(is('abc', Math.E)).equal(false);
    expect(is('abc', -Math.E)).equal(false);
    expect(is('abc', Infinity)).equal(false);
    expect(is('abc', -Infinity)).equal(false);
    expect(is('abc', NaN)).equal(false);
    expect(is('abc', [])).equal(false);
    expect(is('abc', {})).equal(false);
    expect(is('abc', epoch)).equal(false);
    expect(is('abc', point)).equal(false);
  });

  it('should return true for both objects with equals resulting true', () => {
    const a = new Point2D(0, 0);
    const b = new Point2D(0, 0);
    expect(is(a, a)).equal(true);
    expect(is(a, b)).equal(true);
    expect(is(b, a)).equal(true);
    expect(is(b, b)).equal(true);
  });

  it('should return false for both objects with equals resulting false', () => {
    const a = new Point2D(3, 4);
    const b = new Point2D(5, 12);
    expect(is(a, b)).equal(false);
    expect(is(b, a)).equal(false);
  });

  it('should return true for both objects with equal valueOf', () => {
    const a = new Date(0);
    const b = new Date(0);
    expect(is(a, a)).equal(true);
    expect(is(a, b)).equal(true);
    expect(is(b, a)).equal(true);
    expect(is(b, b)).equal(true);
  });

  it('should return false for both objects with different valueOf', () => {
    const a = new Date(0);
    const b = new Date(1);
    expect(is(a, b)).equal(false);
    expect(is(b, a)).equal(false);
  });

  it('should return true for both objects with same reference', () => {
    const a = Object.prototype;
    const b = Object.prototype;
    expect(is(a, a)).equal(true);
    expect(is(a, b)).equal(true);
    expect(is(b, a)).equal(true);
    expect(is(b, b)).equal(true);
  });

  it('should return false for both objects with different reference', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);

    expect(is(epoch, [])).equal(false);
    expect(is(epoch, {})).equal(false);
    expect(is(epoch, point)).equal(false);

    expect(is(point, [])).equal(false);
    expect(is(point, {})).equal(false);
    expect(is(point, epoch)).equal(false);

    expect(is([], [])).equal(false);
    expect(is([], {})).equal(false);
    expect(is([], epoch)).equal(false);
    expect(is([], point)).equal(false);

    expect(is({}, [])).equal(false);
    expect(is({}, {})).equal(false);
    expect(is({}, epoch)).equal(false);
    expect(is({}, point)).equal(false);
  });

  it('should return false for a object and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);

    expect(is([], null)).equal(false);
    expect(is([], undefined)).equal(false);
    expect(is([], false)).equal(false);
    expect(is([], true)).equal(false);
    expect(is([], +0)).equal(false);
    expect(is([], -0)).equal(false);
    expect(is([], Math.E)).equal(false);
    expect(is([], -Math.E)).equal(false);
    expect(is([], Infinity)).equal(false);
    expect(is([], -Infinity)).equal(false);
    expect(is([], NaN)).equal(false);
    expect(is([], '')).equal(false);
    expect(is([], 'abc')).equal(false);

    expect(is({}, null)).equal(false);
    expect(is({}, undefined)).equal(false);
    expect(is({}, false)).equal(false);
    expect(is({}, true)).equal(false);
    expect(is({}, +0)).equal(false);
    expect(is({}, -0)).equal(false);
    expect(is({}, Math.E)).equal(false);
    expect(is({}, -Math.E)).equal(false);
    expect(is({}, Infinity)).equal(false);
    expect(is({}, -Infinity)).equal(false);
    expect(is({}, NaN)).equal(false);
    expect(is({}, '')).equal(false);
    expect(is({}, 'abc')).equal(false);

    expect(is(epoch, null)).equal(false);
    expect(is(epoch, undefined)).equal(false);
    expect(is(epoch, false)).equal(false);
    expect(is(epoch, true)).equal(false);
    expect(is(epoch, +0)).equal(false);
    expect(is(epoch, -0)).equal(false);
    expect(is(epoch, Math.E)).equal(false);
    expect(is(epoch, -Math.E)).equal(false);
    expect(is(epoch, Infinity)).equal(false);
    expect(is(epoch, -Infinity)).equal(false);
    expect(is(epoch, NaN)).equal(false);
    expect(is(epoch, '')).equal(false);
    expect(is(epoch, 'abc')).equal(false);

    expect(is(point, null)).equal(false);
    expect(is(point, undefined)).equal(false);
    expect(is(point, false)).equal(false);
    expect(is(point, true)).equal(false);
    expect(is(point, +0)).equal(false);
    expect(is(point, -0)).equal(false);
    expect(is(point, Math.E)).equal(false);
    expect(is(point, -Math.E)).equal(false);
    expect(is(point, Infinity)).equal(false);
    expect(is(point, -Infinity)).equal(false);
    expect(is(point, NaN)).equal(false);
    expect(is(point, '')).equal(false);
    expect(is(point, 'abc')).equal(false);
  });
});

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
    return (this.x + this.y) >>> 0;
  }
}
