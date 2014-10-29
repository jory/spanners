/*global describe,it*/
'use strict';
var assert = require('assert'),
    spanners = require('../lib/spanners.js'),
    jsdom = require('jsdom');

describe('spanners node module.', function () {

  it('no children, no childNodes', function() {

    jsdom.env('<br/>',  function (errors, window) {

      var node = window.document.body.firstChild;
      assert(spanners.squirrel(node), node);
    });
  });
});
