'use strict';

module.exports = function (math) {
  var util = require('../../util/index'),

      BigNumber = math.type.BigNumber,
      Complex = require('../../type/Complex'),
      collection = require('../../type/collection'),

      isNumber = util.number.isNumber,
      isBoolean = util['boolean'].isBoolean,
      isComplex = Complex.isComplex,
      isCollection = collection.isCollection;

  /**
   * Calculate the cube root of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.cbrt(x)
   *
   * Examples:
   *
   *    math.cbrt(125);               // returns 5
   *    math.cbrt(-8);                // returns -2
   *
   * See also:
   *
   *    cube, multiply
   *
   * @param {Number | BigNumber | Boolean | Complex | Array | Matrix | null} x
   *            Value for which to calculate the cube root.
   * @return {Number | BigNumber | Complex | Array | Matrix}
   *            Returns the cube root of `x`
   */
  math.cbrt = function cbrt (x) {
    if (arguments.length != 1) {
      throw new math.error.ArgumentsError('cbrt', arguments.length, 1);
    }

    if (isNumber(x)) {
      if (Math.cbrt) {
        return Math.cbrt(x);
      } else {
        return math.sign(x)*math.pow(math.abs(x), 1/3);
      }
    }

    // figure this out...
    //if (isComplex(x)) {
    //}

    if (x instanceof BigNumber) {
      return math.sign(x)*math.pow(math.abs(x), 1/3);
    }

    if (isCollection(x)) {
      return collection.deepMap(x, cbrt);
    }

    if (isBoolean(x) || x === null) {
      return cbrt(+x);
    }

    throw new math.error.UnsupportedTypeError('cbrt', math['typeof'](x));
  };
};
