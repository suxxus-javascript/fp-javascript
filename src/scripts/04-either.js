'use strict';

(function() {

    // The Either type is very similar to the Maybe type,
    // in that it is often used to represent the notion
    // of failure in some way.
    // The Either type consists of two constructors,
    // Left :: a -> Either a b
    // Right :: b -> Either a b

    const E = require('ramda-fantasy').Either;
    const { isNil } = require('ramda');
    const Right = E.Right;
    const Left = E.Left;

    const getValue = (value) =>
        isNil(value) ? Left('value is undefined') : Right(value);

    // Instance methods

    // either.map
    // :: Either a b ~> (b -> c) -> Either a c
    console.log(
        getValue(1)
        .map(x => x + 1)
        .toString()
    ); // => Either.Right(2);

    console.log(
        getValue()
        .map(x => x + 1)
        .toString()
    ); // => Either.Left("value is undefined")

    // either.ap
    // :: Either a (b -> c) ~> Either a b -> Either a c
    console.log(
        Right(10)
        .map(a => b => a + b)
        .ap(Right(2))
        .toString()
    ); // => Either.Right(12)

    console.log(
        Right(10)
        .map(a => b => a + b)
        .ap(Left('no value'))
        .toString()
    ); // => Either.Left("no value")

    // either.chain
    // :: Either a b ~> (b -> Either a c) -> Either a c
    console.log(
        getValue(16)
        .chain(x => Right(x + 1))
        .toString()
    ); // => Either.Right(17)

    console.log(
        getValue()
        .chain(x => Right(x + 1))
        .toString()
    ); // => Either.Left("value is undefined")


    // Static functions

    // Either.either
    // :: (a -> c) -> (b -> c) -> Either a b -> c

    const handleRight = a => `Right => ${a}`;
    const handleLeft = b => `Left => ${b}`;

    console.log(
        E.either(handleLeft, handleRight, getValue())
    ); // Left => value is undefined

    console.log(
        E.either(handleLeft, handleRight, getValue(1))
    ); // Right => 1



    const getValue2 = (value) =>
        isNil(value) ? Left(console.log('value is undefined')) : Right(value);


    getValue2(() => console.log('xs'))
        .map(x => x());

}());
