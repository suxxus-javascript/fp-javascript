'use strict';

var test = require('tape');
var main = require('scripts');

test('index', function(t) {
    var actual = main(),
        expect = true;
    t.ok(actual, expect);
    t.end();
});
