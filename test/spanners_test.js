/*global describe,it*/
'use strict';
var assert = require('assert'),
    spanners = require('../lib/spanners.js'),
    jsdom = require('jsdom');

var compare = function (input, output) {
  jsdom.env(input, function (iErrors, iWindow) {
    jsdom.env(output, function (oErrors, oWindow) {
      var inner = spanners.squirrel(iWindow.document.body).innerHTML;
      var outer = oWindow.document.body.innerHTML;
      assert(inner === outer, input + " !== " + output);
    });
  });
};

describe('spanners node module.', function () {

  it('no children, no childNodes', function () {
    compare('<br/>', '<br/>');
  });

  it('no children, a childNode', function () {
    compare('<div>blah</div>', '<div><span>b</span><span>l</span><span>a</span><span>h</span></div>');
  });
});
