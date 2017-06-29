'use strict';

const Maybe = require('ramda-fantasy').Maybe;
const Identity = require('ramda-fantasy').Identity;
const E = require('ramda-fantasy').Either;
const IO = require('ramda-fantasy').IO;
const { isNil, compose, map, inc, toString } = require('ramda');

const Just = Maybe.Just;
const Right = E.Right;
const Left = E.Left;
const either = E.either;
const isNothing = Maybe.isNothing;

//  join :: Monad m => m (m a) -> m a
const chain = function(mma) {
    return mma.chain(x => x);
};

(function() {

    const users = {
        addresses: [{
            street: {
                name: 'Mulburry',
                number: 8402,
            },
            postcode: 'WC2N',
        }]
    };

    // safeProp :: Key -> {Key: a} -> Maybe a
    const safeProp = (key) =>
        (obj) => Maybe(obj[key]);

    // safeHead :: [a] -> Maybe a
    const safeHead = safeProp(0);

    //  join :: Monad m => m (m a) -> m a
    const chain = function(mma) {
        return mma.chain(x => x);
    };

    //     Maybe(users.addresses)
    //     .map(x => Maybe(x[0]))
    //     .chain(x => x)
    //     .map(x => Maybe(x.street))
    //     .chain(x => x)
    //     .toString()
    // => Maybe.Just({"name": "Mulburry", "number": 8402})

    //  firstAddressStreet :: User -> Maybe Street
    const firstAddressStreet = compose(
        chain,
        map(safeProp('street')),
        chain,
        map(safeHead),
        safeProp('addresses')
    );

    firstAddressStreet(users);
    // => Maybe.Just({"name": "Mulburry", "number": 8402})
}());

(function() {

    const log = console.log.bind(console);
    let num;
    //    enum Err {'no value'}

    const checkVals = x => isNil(x) ? Left(new Error('can not do it')) : Right(x);
    //    const handleLef

    // compose(
    //     log,
    //     chain,
    //     map(x => `your values is: ${x}`),
    //     map(inc),
    //     map(x => Either.either(x => x, x => x)),
    //     Either.either(()) checkVals
    // )(num)



    compose(
        //        log,
        // chain,
        map(x => `your values is: ${x}`),
        map(inc),
        // map(x => Either.either(x => x, x => x)),
        checkVals
    )(num);


    const handleL = log;



    const aux = compose(
        chain,
        map(x => `your values is: ${x}`),
        Maybe,
        either(e => log('-->', e.message), inc),
        checkVals
    )(num);

    const aux2 = Maybe(null)
        // .chain(x => !x ? 'none' : x)
        .map(inc)
        .getOrElse('noen');


    console.log(aux2);




    // console.log(
    //         checkVals(num)
    //           .map(inc)
    //           .map(toString)
    //           .chain(x => 'your value is ' + x)

    //   );



    // console.log(
    //     Maybe(checkVals(num))
    //     .chain(x => x)
    //     .map(inc)
    //     .chain(x => `your value is: ${x}`)

    //   );

    // console.log(
    // Maybe(num)
    // .chain(x => x)
    // .toString()

    // compose(
    //         map(x => {
    //                 console.log(x);
    //             }
    //             //isNothing(x) ? Left('can do it') : Right(chain(x))
    //         ),
    //         chain,
    //         Maybe
    //     )(num)
    // );

    /*
  //  log :: a -> IO a
var log = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
};

//  setStyle :: Selector -> CSSProps -> IO DOM
var setStyle = curry(function(sel, props) {
  return new IO(function() {
    return jQuery(sel).css(props);
  });
});

//  getItem :: String -> IO String
var getItem = function(key) {
  return new IO(function() {
    return localStorage.getItem(key);
  });
};

//  applyPreferences :: String -> IO DOM
var applyPreferences = compose(
  join, map(setStyle('#main')), join, map(log), map(JSON.parse), getItem
);


applyPreferences('preferences').unsafePerformIO();
// Object {backgroundColor: "green"}
// <div style="background-color: 'green'"/>


  */

    // IO(console.log(x);)

}());
