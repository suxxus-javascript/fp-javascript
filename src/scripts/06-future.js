'use strict';
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { Future } = require('ramda-fantasy');
const { compose, curry, join, map, split, toUpper } = require('ramda');
const log = console.log.bind(console);
const fork = curry((rej, res, mma) => mma.fork(rej, res));

// The Future type is used to represent some future,
// often asynchronous, action that may potentially fail.

(function() {
    // :: a -> Future e a
    Future.of(1)
        .map(x => x + 1)
        .fork(log, log);
}());

(function() {
    // :: ((e -> (), a -> ()) -> ()) -> Future e a
    Future((reject, resolve) => {
            setTimeout(() => resolve('ok'), 1000);
        })
        .fork(log, log);

    Future((reject, resolve) => {
            const file = path.resolve(__dirname, 'test.json');

            fs.readFile(file, 'utf8', (err, data) => {

                if (err) {
                    reject(err.message);
                    return;
                }

                resolve(data);
            });
        })
        .map((result) => JSON.parse(result))
        .map((data) => `user is: ${data.user}`)
        .fork(log, log);
}());

(function() {
    Future((reject, resolve) => {
            fetch('http://date.jsontest.com')
                .then((r) => {
                    r.json().then(resolve);
                }, reject);
        })
        .fork((err) => {
            log('error -->', err.message);
        }, (data) => {
            log(data);
        });
}());

(function() {
    let state = {};

    const delay = ms => new Promise((resolve, reject) => {
        ms >= 1000 ? reject(new Error('error: ms is too long')) :
            setTimeout(() => resolve('hello world'), 1000);
    });

    const reduceGreet = curry((st, greet) => Object.assign({}, st, { greet }));

    const f = Future((reject, resolve) => {
        delay(900).then(resolve).catch(reject);
    });

    const logError = ({ message }) => {
        log(message);
    };

    const setState = obj => {
        state = obj;
    };

    const greetToUpperCase = compose(
        fork(logError, setState),
        map(reduceGreet(state)),
        map(toUpper),
        map(join('-')),
        map(split(' '))
    );

    greetToUpperCase(f);

    setTimeout(() => {
        log(state);
    }, 1100);
}());
