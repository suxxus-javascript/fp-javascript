'use strict';

(function() {
    const Identity = require('ramda-fantasy').Identity;

    console.log(
        Identity(5)
        .map(x => x)
        .toString()
    ); // => Identity(5)

}())
