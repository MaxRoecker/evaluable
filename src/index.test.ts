import { describe, it, expect } from 'bun:test';
import { type Evaluable, is } from './index';

describe('is tests', () => {
  it('should return true for both null', () => {
    expect(is(null, null)).toBe(true);
  });

  it('should return false for null and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(null, undefined)).toBe(false);
    expect(is(null, false)).toBe(false);
    expect(is(null, true)).toBe(false);
    expect(is(null, +0)).toBe(false);
    expect(is(null, -0)).toBe(false);
    expect(is(null, Math.E)).toBe(false);
    expect(is(null, -Math.E)).toBe(false);
    expect(is(null, Infinity)).toBe(false);
    expect(is(null, -Infinity)).toBe(false);
    expect(is(null, NaN)).toBe(false);
    expect(is(null, '')).toBe(false);
    expect(is(null, 'abc')).toBe(false);
    expect(is(null, [])).toBe(false);
    expect(is(null, {})).toBe(false);
    expect(is(null, epoch)).toBe(false);
    expect(is(null, point)).toBe(false);
  });

  it('should return true for both undefined', () => {
    expect(is(undefined, undefined)).toBe(true);
  });

  it('should return false for undefined and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(undefined, null)).toBe(false);
    expect(is(undefined, false)).toBe(false);
    expect(is(undefined, true)).toBe(false);
    expect(is(undefined, +0)).toBe(false);
    expect(is(undefined, -0)).toBe(false);
    expect(is(undefined, Math.E)).toBe(false);
    expect(is(undefined, -Math.E)).toBe(false);
    expect(is(undefined, Infinity)).toBe(false);
    expect(is(undefined, -Infinity)).toBe(false);
    expect(is(undefined, NaN)).toBe(false);
    expect(is(undefined, '')).toBe(false);
    expect(is(undefined, 'abc')).toBe(false);
    expect(is(undefined, [])).toBe(false);
    expect(is(undefined, {})).toBe(false);
    expect(is(undefined, epoch)).toBe(false);
    expect(is(undefined, point)).toBe(false);
  });

  it('should return true for both true', () => {
    expect(is(true, true)).toBe(true);
  });

  it('should return false for true and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(true, null)).toBe(false);
    expect(is(true, undefined)).toBe(false);
    expect(is(true, false)).toBe(false);
    expect(is(true, +0)).toBe(false);
    expect(is(true, -0)).toBe(false);
    expect(is(true, Math.E)).toBe(false);
    expect(is(true, -Math.E)).toBe(false);
    expect(is(true, Infinity)).toBe(false);
    expect(is(true, -Infinity)).toBe(false);
    expect(is(true, NaN)).toBe(false);
    expect(is(true, '')).toBe(false);
    expect(is(true, 'abc')).toBe(false);
    expect(is(true, [])).toBe(false);
    expect(is(true, {})).toBe(false);
    expect(is(true, epoch)).toBe(false);
    expect(is(true, point)).toBe(false);
  });

  it('should return true for both false', () => {
    expect(is(false, false)).toBe(true);
  });

  it('should return false for false and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(false, null)).toBe(false);
    expect(is(false, undefined)).toBe(false);
    expect(is(false, true)).toBe(false);
    expect(is(false, +0)).toBe(false);
    expect(is(false, -0)).toBe(false);
    expect(is(false, Math.E)).toBe(false);
    expect(is(false, -Math.E)).toBe(false);
    expect(is(false, Infinity)).toBe(false);
    expect(is(false, -Infinity)).toBe(false);
    expect(is(false, NaN)).toBe(false);
    expect(is(false, '')).toBe(false);
    expect(is(false, 'abc')).toBe(false);
    expect(is(false, [])).toBe(false);
    expect(is(false, {})).toBe(false);
    expect(is(false, epoch)).toBe(false);
    expect(is(false, point)).toBe(false);
  });

  it('should return true for both NaN', () => {
    expect(is(NaN, NaN)).toBe(true);
  });

  it('should return false for NaN and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(NaN, null)).toBe(false);
    expect(is(NaN, undefined)).toBe(false);
    expect(is(NaN, false)).toBe(false);
    expect(is(NaN, true)).toBe(false);
    expect(is(NaN, +0)).toBe(false);
    expect(is(NaN, -0)).toBe(false);
    expect(is(NaN, Math.E)).toBe(false);
    expect(is(NaN, -Math.E)).toBe(false);
    expect(is(NaN, Infinity)).toBe(false);
    expect(is(NaN, -Infinity)).toBe(false);
    expect(is(NaN, '')).toBe(false);
    expect(is(NaN, 'abc')).toBe(false);
    expect(is(NaN, [])).toBe(false);
    expect(is(NaN, {})).toBe(false);
    expect(is(NaN, epoch)).toBe(false);
    expect(is(NaN, point)).toBe(false);
  });

  it('should return true for both numbers with equal values', () => {
    expect(is(+0, +0)).toBe(true);
    expect(is(+0, -0)).toBe(true);
    expect(is(-0, +0)).toBe(true);
    expect(is(-0, -0)).toBe(true);
    expect(is(Math.E, Math.E)).toBe(true);
    expect(is(-Math.E, -Math.E)).toBe(true);
    expect(is(+Infinity, +Infinity)).toBe(true);
    expect(is(-Infinity, -Infinity)).toBe(true);
  });

  it('should return true for both numbers with difference within the delta', () => {
    expect(is(0.3, 0.1 + 0.2)).toBe(true);
    expect(is(0.1 + 0.2, 0.3)).toBe(true);
    expect(is(1000000.1 + 0.2, 1000000.3, 1e-6)).toBe(true);
    expect(is(1000000.3, 1000000.1 + 0.2, 1e-6)).toBe(true);
  });

  it('should return false for both numbers with different values', () => {
    expect(is(Math.E, -Math.E)).toBe(false);
    expect(is(Math.E, +0)).toBe(false);
    expect(is(Math.E, -0)).toBe(false);
    expect(is(Math.E, +Infinity)).toBe(false);
    expect(is(Math.E, -Infinity)).toBe(false);
    expect(is(Math.E, NaN)).toBe(false);

    expect(is(-Math.E, Math.E)).toBe(false);
    expect(is(-Math.E, +0)).toBe(false);
    expect(is(-Math.E, -0)).toBe(false);
    expect(is(-Math.E, +Infinity)).toBe(false);
    expect(is(-Math.E, -Infinity)).toBe(false);
    expect(is(-Math.E, NaN)).toBe(false);

    expect(is(+0, Math.E)).toBe(false);
    expect(is(+0, -Math.E)).toBe(false);
    expect(is(+0, +Infinity)).toBe(false);
    expect(is(+0, -Infinity)).toBe(false);
    expect(is(+0, NaN)).toBe(false);

    expect(is(-0, Math.E)).toBe(false);
    expect(is(-0, -Math.E)).toBe(false);
    expect(is(-0, +Infinity)).toBe(false);
    expect(is(-0, -Infinity)).toBe(false);
    expect(is(-0, NaN)).toBe(false);

    expect(is(+Infinity, Math.E)).toBe(false);
    expect(is(+Infinity, -Math.E)).toBe(false);
    expect(is(+Infinity, +0)).toBe(false);
    expect(is(+Infinity, -0)).toBe(false);
    expect(is(+Infinity, -Infinity)).toBe(false);
    expect(is(+Infinity, NaN)).toBe(false);

    expect(is(-Infinity, Math.E)).toBe(false);
    expect(is(-Infinity, -Math.E)).toBe(false);
    expect(is(-Infinity, +0)).toBe(false);
    expect(is(-Infinity, -0)).toBe(false);
    expect(is(-Infinity, +Infinity)).toBe(false);
    expect(is(-Infinity, NaN)).toBe(false);
  });

  it('should return false for a number and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is(+0, null)).toBe(false);
    expect(is(+0, undefined)).toBe(false);
    expect(is(+0, false)).toBe(false);
    expect(is(+0, true)).toBe(false);
    expect(is(+0, '')).toBe(false);
    expect(is(+0, 'abc')).toBe(false);
    expect(is(+0, [])).toBe(false);
    expect(is(+0, {})).toBe(false);
    expect(is(+0, epoch)).toBe(false);
    expect(is(+0, point)).toBe(false);

    expect(is(-0, null)).toBe(false);
    expect(is(-0, undefined)).toBe(false);
    expect(is(-0, false)).toBe(false);
    expect(is(-0, true)).toBe(false);
    expect(is(-0, '')).toBe(false);
    expect(is(-0, 'abc')).toBe(false);
    expect(is(-0, [])).toBe(false);
    expect(is(-0, {})).toBe(false);
    expect(is(-0, epoch)).toBe(false);
    expect(is(-0, point)).toBe(false);

    expect(is(Math.E, null)).toBe(false);
    expect(is(Math.E, undefined)).toBe(false);
    expect(is(Math.E, false)).toBe(false);
    expect(is(Math.E, true)).toBe(false);
    expect(is(Math.E, '')).toBe(false);
    expect(is(Math.E, 'abc')).toBe(false);
    expect(is(Math.E, [])).toBe(false);
    expect(is(Math.E, {})).toBe(false);
    expect(is(Math.E, epoch)).toBe(false);
    expect(is(Math.E, point)).toBe(false);

    expect(is(-Math.E, null)).toBe(false);
    expect(is(-Math.E, undefined)).toBe(false);
    expect(is(-Math.E, false)).toBe(false);
    expect(is(-Math.E, true)).toBe(false);
    expect(is(-Math.E, '')).toBe(false);
    expect(is(-Math.E, 'abc')).toBe(false);
    expect(is(-Math.E, [])).toBe(false);
    expect(is(-Math.E, {})).toBe(false);
    expect(is(-Math.E, epoch)).toBe(false);
    expect(is(-Math.E, point)).toBe(false);

    expect(is(+Infinity, null)).toBe(false);
    expect(is(+Infinity, undefined)).toBe(false);
    expect(is(+Infinity, false)).toBe(false);
    expect(is(+Infinity, true)).toBe(false);
    expect(is(+Infinity, '')).toBe(false);
    expect(is(+Infinity, 'abc')).toBe(false);
    expect(is(+Infinity, [])).toBe(false);
    expect(is(+Infinity, {})).toBe(false);
    expect(is(+Infinity, epoch)).toBe(false);
    expect(is(+Infinity, point)).toBe(false);

    expect(is(-Infinity, null)).toBe(false);
    expect(is(-Infinity, undefined)).toBe(false);
    expect(is(-Infinity, false)).toBe(false);
    expect(is(-Infinity, true)).toBe(false);
    expect(is(-Infinity, '')).toBe(false);
    expect(is(-Infinity, 'abc')).toBe(false);
    expect(is(-Infinity, [])).toBe(false);
    expect(is(-Infinity, {})).toBe(false);
    expect(is(-Infinity, epoch)).toBe(false);
    expect(is(-Infinity, point)).toBe(false);
  });

  it('should return true for both strings with same sequence', () => {
    expect(is('', '')).toBe(true);
    expect(is('abc', 'abc')).toBe(true);
    expect(is('\u00F1', '\u00F1')).toBe(true);
    expect(is('\u00F1', '\u006E\u0303')).toBe(true);
    expect(is('\u006E\u0303', '\u00F1')).toBe(true);
    expect(is('\u006E\u0303', '\u006E\u0303')).toBe(true);
  });

  it('should return false for both strings with different sequences', () => {
    expect(is('', 'abc')).toBe(false);
    expect(is('', '\u00F1')).toBe(false);
    expect(is('', '\u006E\u0303')).toBe(false);
    expect(is('abc', '')).toBe(false);
    expect(is('abc', '\u00F1')).toBe(false);
    expect(is('abc', '\u006E\u0303')).toBe(false);
    expect(is('\u00F1', '')).toBe(false);
    expect(is('\u00F1', 'abc')).toBe(false);
    expect(is('\u006E\u0303', '')).toBe(false);
    expect(is('\u006E\u0303', 'abc')).toBe(false);
  });

  it('should return false for a string and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);
    expect(is('', null)).toBe(false);
    expect(is('', undefined)).toBe(false);
    expect(is('', false)).toBe(false);
    expect(is('', true)).toBe(false);
    expect(is('', +0)).toBe(false);
    expect(is('', -0)).toBe(false);
    expect(is('', Math.E)).toBe(false);
    expect(is('', -Math.E)).toBe(false);
    expect(is('', Infinity)).toBe(false);
    expect(is('', -Infinity)).toBe(false);
    expect(is('', NaN)).toBe(false);
    expect(is('', [])).toBe(false);
    expect(is('', {})).toBe(false);
    expect(is('', epoch)).toBe(false);
    expect(is('', point)).toBe(false);

    expect(is('abc', null)).toBe(false);
    expect(is('abc', undefined)).toBe(false);
    expect(is('abc', false)).toBe(false);
    expect(is('abc', true)).toBe(false);
    expect(is('abc', +0)).toBe(false);
    expect(is('abc', -0)).toBe(false);
    expect(is('abc', Math.E)).toBe(false);
    expect(is('abc', -Math.E)).toBe(false);
    expect(is('abc', Infinity)).toBe(false);
    expect(is('abc', -Infinity)).toBe(false);
    expect(is('abc', NaN)).toBe(false);
    expect(is('abc', [])).toBe(false);
    expect(is('abc', {})).toBe(false);
    expect(is('abc', epoch)).toBe(false);
    expect(is('abc', point)).toBe(false);
  });

  it('should return true for both objects with equals resulting true', () => {
    const a = new Point2D(0, 0);
    const b = new Point2D(0, 0);
    expect(is(a, a)).toBe(true);
    expect(is(a, b)).toBe(true);
    expect(is(b, a)).toBe(true);
    expect(is(b, b)).toBe(true);
  });

  it('should return false for both objects with equals resulting false', () => {
    const a = new Point2D(3, 4);
    const b = new Point2D(5, 12);
    expect(is(a, b)).toBe(false);
    expect(is(b, a)).toBe(false);
  });

  it('should return true for both objects with equal valueOf', () => {
    const a = new Date(0);
    const b = new Date(0);
    expect(is(a, a)).toBe(true);
    expect(is(a, b)).toBe(true);
    expect(is(b, a)).toBe(true);
    expect(is(b, b)).toBe(true);
  });

  it('should return false for both objects with different valueOf', () => {
    const a = new Date(0);
    const b = new Date(1);
    expect(is(a, b)).toBe(false);
    expect(is(b, a)).toBe(false);
  });

  it('should return true for both objects with same reference', () => {
    const a = Object.prototype;
    const b = Object.prototype;
    expect(is(a, a)).toBe(true);
    expect(is(a, b)).toBe(true);
    expect(is(b, a)).toBe(true);
    expect(is(b, b)).toBe(true);
  });

  it('should return false for both objects with different reference', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);

    expect(is(epoch, [])).toBe(false);
    expect(is(epoch, {})).toBe(false);
    expect(is(epoch, point)).toBe(false);

    expect(is(point, [])).toBe(false);
    expect(is(point, {})).toBe(false);
    expect(is(point, epoch)).toBe(false);

    expect(is([], [])).toBe(false);
    expect(is([], {})).toBe(false);
    expect(is([], epoch)).toBe(false);
    expect(is([], point)).toBe(false);

    expect(is({}, [])).toBe(false);
    expect(is({}, {})).toBe(false);
    expect(is({}, epoch)).toBe(false);
    expect(is({}, point)).toBe(false);
  });

  it('should return false for a object and anything else', () => {
    const epoch = new Date(0);
    const point = new Point2D(0, 0);

    expect(is([], null)).toBe(false);
    expect(is([], undefined)).toBe(false);
    expect(is([], false)).toBe(false);
    expect(is([], true)).toBe(false);
    expect(is([], +0)).toBe(false);
    expect(is([], -0)).toBe(false);
    expect(is([], Math.E)).toBe(false);
    expect(is([], -Math.E)).toBe(false);
    expect(is([], Infinity)).toBe(false);
    expect(is([], -Infinity)).toBe(false);
    expect(is([], NaN)).toBe(false);
    expect(is([], '')).toBe(false);
    expect(is([], 'abc')).toBe(false);

    expect(is({}, null)).toBe(false);
    expect(is({}, undefined)).toBe(false);
    expect(is({}, false)).toBe(false);
    expect(is({}, true)).toBe(false);
    expect(is({}, +0)).toBe(false);
    expect(is({}, -0)).toBe(false);
    expect(is({}, Math.E)).toBe(false);
    expect(is({}, -Math.E)).toBe(false);
    expect(is({}, Infinity)).toBe(false);
    expect(is({}, -Infinity)).toBe(false);
    expect(is({}, NaN)).toBe(false);
    expect(is({}, '')).toBe(false);
    expect(is({}, 'abc')).toBe(false);

    expect(is(epoch, null)).toBe(false);
    expect(is(epoch, undefined)).toBe(false);
    expect(is(epoch, false)).toBe(false);
    expect(is(epoch, true)).toBe(false);
    expect(is(epoch, +0)).toBe(false);
    expect(is(epoch, -0)).toBe(false);
    expect(is(epoch, Math.E)).toBe(false);
    expect(is(epoch, -Math.E)).toBe(false);
    expect(is(epoch, Infinity)).toBe(false);
    expect(is(epoch, -Infinity)).toBe(false);
    expect(is(epoch, NaN)).toBe(false);
    expect(is(epoch, '')).toBe(false);
    expect(is(epoch, 'abc')).toBe(false);

    expect(is(point, null)).toBe(false);
    expect(is(point, undefined)).toBe(false);
    expect(is(point, false)).toBe(false);
    expect(is(point, true)).toBe(false);
    expect(is(point, +0)).toBe(false);
    expect(is(point, -0)).toBe(false);
    expect(is(point, Math.E)).toBe(false);
    expect(is(point, -Math.E)).toBe(false);
    expect(is(point, Infinity)).toBe(false);
    expect(is(point, -Infinity)).toBe(false);
    expect(is(point, NaN)).toBe(false);
    expect(is(point, '')).toBe(false);
    expect(is(point, 'abc')).toBe(false);
  });
});

class Point2D implements Evaluable {
  x: number;
  y: number;

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
    return (this.x ^ this.y) >>> 0;
  }
}
