'use strict';

const curry = require('ramda').curry;

(function() {

    const match = curry((what, str) => str.match(what));
    const replace = curry((what, replacement, str) => str.replace(what, replacement));
    const filter = curry((fn, ary) => ary.filter(fn));
    const map = curry((fn, ary) => ary.map(fn));

    const hasSpaces = match(/\s+/g);
    const findSpaces = filter(hasSpaces);
    const noVowels = replace(/[aeiouy]/ig);
    const censored = noVowels('*');

    console.log(match(/\s+/g, 'Hello world'));
    console.log(match(/\s+/g)('Hello world'));
    console.log(hasSpaces('spaceless'));
    console.log(filter(hasSpaces, ['tori_spelling', 'tori amos']));
    console.log(findSpaces(['tori_spelling', 'tori amos']));
    console.log(censored('this is a crazy world'));

    const childNodes = (x) => x.childNodes;
    const allChildren = map(childNodes);

    console.log(
        allChildren([
            { childNodes: { a: 1 } },
            { childNodes: { a: 18 } }
        ])
    );

}());

