require('../../support');
var curry = require('ramda').curry;

var map = curry((fn, ary) => ary.map(fn));
var filter = curry((fn, ary) => ary.filter(fn));
var reduce = curry((fn, initial, ary) => ary.reduce(fn, initial));
var split = curry((what, str) => str.split(what));
var match = curry((pattern, str) => str.match(pattern));
// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the functioni
var words = split(' ');

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.
var sentences = map(words);

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions

// var filterQs = function(xs) {
//     return filter(function(x) {
//         return match(/q/i, x);
//     }, xs);
// };
var matchQs = match(/q/i);
var filterQs = filter(matchQs);

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any arguments

// LEAVE BE:
var _keepHighest = function(x, y) {
    return x >= y ? x : y;
};

// REFACTOR THIS ONE:
// var max = function(xs) {
//     return reduce(function(acc, x) {
//         return _keepHighest(acc, x);
//     }, -Infinity, xs);
// };

var max = reduce(_keepHighest, -Infinity);



// Bonus 1:
// ============
// wrap array's slice to be functional and curried.
// //[1,2,3].slice(0, 2)
var slice = curry((start, end, ary) => ary.slice(start, end));


// Bonus 2:
// ============
// use slice to define a function "take" that takes n elements. Make it curried
var take = (x) => (xs) => slice(0, x, xs);


module.exports = {
    words: words,
    sentences: sentences,
    filterQs: filterQs,
    max: max,
    slice: slice,
    take: take
};
