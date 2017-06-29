'use strict';

(function() {
    const Identity = require('ramda-fantasy').Identity;
    const { head, map } = require('ramda');

    const add = (a) => (b) => a + b;
    var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

    console.log(
        Identity.of(8)
        .map(add(1))
        .toString()
    );

    console.log(
        map(add(1), Identity.of(1))
        .toString()
    );

    console.log(
        map(head, xs)
        .toString()
    );


    console.log(
        Identity(5)
        .map(x => x + 1)
        .toString()
    ); // => Identity(5)

}());
