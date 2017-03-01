'use strict';

(function() {

    const Maybe = require('ramda-fantasy').Maybe;
    const Future = require('ramda-fantasy').Future;
    const E = require('ramda-fantasy').Either;
    const Right = E.Right;
    const Left = E.Left;
    const { compose, map, reverse, toUpper } = require('ramda');


    //  topRoute :: String -> Maybe String
    const topRoute = compose(Maybe.of, reverse);

    //  bottomRoute :: String -> Maybe String
    const bottomRoute = compose(map(reverse), Maybe.of);

    console.log(
        topRoute('hi')
        // Maybe('ih')
    );

    console.log(
        bottomRoute('hi')
        // Maybe('ih'
    );

    const nested = Future.of([Right('pillows'), Left('no sleep for you')]);

    map(map(map(toUpper)), nested)
        .fork(console.log, console.log);

}());
