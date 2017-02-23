'use strict';

const Maybe = require('ramda-fantasy').Maybe;
const { isNil } = require('ramda');

(function() {

    // The Maybe type consists of two constructors,
    // Just :: a -> Maybe a
    // Nothing :: () -> Maybe a
    // representing the existence and absence of some type a respectively.

    const Just = Maybe.Just;
    const Nothing = Maybe.Nothing;

    console.log(
        Maybe(1)
        .map(x => x + 1)
        .toString()
    ); // => Maybe.Just(2)

    console.log(
        Maybe()
        .map(x => x + 1)
        .toString()
    ); // => Maybe.Nothing()

    console.log(
        Maybe({ a: 1 })
        .map(x => x.b) // b is undefined
        .map(x => x + 1)
        .toString()
    ); // => Maybe.Just(NaN)

    console.log(
        Maybe({ a: 1 })
        .chain(x => isNil(x.b) ? Nothing() : Just(x.b)) //  => Nothing()
        .map(x => x + 1)
        .toString()
    ); // => Maybe.Nothing()

    console.log(
        Maybe({ a: 1, b: 1 })
        .chain(x => isNil(x.b) ? Nothing() : Just(x.b)) //  => Just(1)
        .map(x => x + 1)
        .toString()
    ); // => Maybe.Just(2)

    console.log(
        Maybe('a')
        .getOrElse('no value')
        .toString()
    ); // => Maybe.Just(2)

    console.log(
        Maybe('Z')
        .map(a => b => `${a}+${b}`)
        .ap(Just('Y'))
        .toString()
    ); // => Maybe.Just("Z+Y")

    // Static functions
    console.log(
        Maybe.of(1)
    ); // => Just { value: 1 };

    console.log(
        Maybe.maybe('no value', x => x + 1, Just(1))
        .toString() // => 2
    ); // => 2

    console.log(
        Maybe.maybe('no value', x => x + 1, Nothing())
        .toString()
    ); // => 'no value'

}());
