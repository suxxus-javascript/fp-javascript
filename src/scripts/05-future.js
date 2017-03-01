(function() {

// The Future type is used to represent some future,
// often asynchronous, action that may potentially fail.

    const fs = require('fs');
    const fetch = require('node-fetch');
    const Future = require('ramda-fantasy').Future;

    // :: ((e -> (), a -> ()) -> ()) -> Future e a
    Future((reject, resolve) => {
            setTimeout(() => resolve('ok'), 1000)
        })
        .fork(console.log, console.log);

    // :: a -> Future e a
    Future.of(1)
         .map(x => x + 1)
         .fork(console.log, console.log);

    Future((reject, resolve) => {
            fs.readFile('test.json', 'utf8', (err, data) => {

                if (err) {
                    reject(err.message);
                    return;
                }

                resolve(data);
            })
        })
        .map((result) => JSON.parse(result))
        .map((data) => `user is: ${data.user}`)
        .fork(console.log, console.log);


    Future((reject, resolve) => {
            fetch('http://date.jsontest.com')
                .then((r) => {
                    r.json().then(resolve);
                }, reject);
        })
        .fork((err) => {
            console.log('error -->', err.message);
        }, (data) => {
            console.log(data);
        });

}());
