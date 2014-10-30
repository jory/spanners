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
      assert(inner === outer, inner);
    });
  });
};

describe('spanners node module.', function () {

  it('children 0, childNodes 0', function () {
    compare('<br/>',
            '<br/>');
  });

  it('children 0, childNodes 1', function () {
    compare('<div>blah</div>',
            '<div><span>b</span><span>l</span><span>a</span><span>h</span></div>');
  });

  it('children 1, childNodes 1', function () {
    compare('<div><p>foo</p></div>',
            '<div><p><span>f</span><span>o</span><span>o</span></p></div>');
  });

  it('children 1, childNodes 3', function () {
    compare('<div>blah<p>foo</p>bar</div>',
            '<div><span>b</span><span>l</span><span>a</span><span>h</span><p><span>f</span><span>o</span><span>o</span></p><span>b</span><span>a</span><span>r</span></div>');
  });

  it('children 2, childNodes 2', function () {
    compare('<div><p>foo</p><p>bar</p></div>',
            '<div><p><span>f</span><span>o</span><span>o</span></p><p><span>b</span><span>a</span><span>r</span></p></div>');
  });
});
