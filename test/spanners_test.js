/*global describe,it*/
'use strict';
var assert = require('assert'),
  spanners = require('../lib/spanners.js');

describe('spanners node module.', function() {
  it('must be awesome', function() {
    assert( spanners.awesome(), 'awesome');
  });

  it('passes through', function () {
    assert( spanners.passThrough('foo'), 'foo');
  });
});
