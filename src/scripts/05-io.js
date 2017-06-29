'use strict';

(function() {


// The IO type is used to store a function that describes some
// computation with side effects, such as reading some data from a file.
// It is important to note that upon construction of an IO instance,
// the action will not be executed until the runIO method is called.

    const fs = require('fs');
    const IO = require('ramda-fantasy').IO;

// :: String -> IO String
    const readFile = (filename) =>
    IO(() => fs.readFileSync(filename, 'utf8'));

    console.log(
    readFile('test.json')
    .map(JSON.parse)
    .runIO()
); // => { user: 'John@gmail.com' }


// io.chain
// IO a ~> (a -> IO b) -> IO b
// Produces an IO instance that when executed, will apply the given
// function to the result of the action in this IO instance and then
// execute the resulting IO action.
    console.log(

    IO(() => process.argv)
     .chain(
         // (data) => IO(() => process.stdout.write(data[0]))
         data => IO(()=>data[0])

     )
    .runIO()
); // => /home/diego/.nvm/versions/node/v6.9.1/bin/nodetrue

}());
