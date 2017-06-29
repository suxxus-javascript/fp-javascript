'use strict';

const Maybe = require('ramda-fantasy').Maybe;
const { map, inc, identity, add, toUpper } = require('ramda');

const Just = Maybe.Just;

//  join :: Monad m => m (m a) -> m a
const print = console.log.bind(console);

(function() {
    const incrementListVals = map(inc);

    // Functors apply a function to a wrapped value:
    // a => a + 3 <*> Just(1)
    print(
        Maybe('a')
        .map(toUpper)
        .toString()
    ); // Maybe.Just("A")

    print(
        Maybe([1, 3, 5])
        .map(incrementListVals)
        .toString()
    ); // Maybe.Just([2, 4, 6])


    // Applicatives apply a wrapped function to a wrapped value
    // Just(a => () => a + 3) <*> Just(2)
    print(
        Maybe(1)
        .map(a => fn => fn(a))
        .ap(Just(inc))
        .toString()
    ); // => Maybe.Just(2)

    print(
        Maybe(3)
        .map(add)
        .ap(Just(2))
        .toString()
    ); // => Maybe.Just(5)

    // Monads apply a function that returns a wrapped value to a wrapped value.
    print(
        Maybe(Just(4))
        .chain(identity)
        .map(add(4))
        .toString()
    ); // Maybe.Just(8)


    const foo = x => Just(x);

    print(
        Maybe(Just(2))
        .chain(identity)
        .map(foo)
        .toString()
    ); // Maybe.Just(8)

}());

/*

1. A functor is a type that implements map.
2. An applicative is a type that implements ap.
3. A monad is a type that implements flatMap.

Array implements map, so it’s a functor.
Promise implements map and flatMap through then, so it is a functor and a monad.

*/

/*

1. functors: you apply a function to a wrapped value.
2. applicatives: you apply a wrapped function to a wrapped value.
3. monads: you apply a function that returns a wrapped value, to a wrapped value.

*/
