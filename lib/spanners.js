/*
 *
 * https://github.com/jory/spanners
 *
 * Copyright (c) 2014 Jory
 * Licensed under the MIT license.
 */

'use strict';

var toArray = Function.call.bind(Array.prototype.slice);


exports.squirrel = function (node) {
  var children = toArray(node.children);
  var numChildren = children.length;

  var childNodes = toArray(node.childNodes);
  var numChildNodes = childNodes.length;

  if (numChildNodes === 0) {
    return node;

  } else if (numChildNodes > numChildren) {
    if (numChildNodes === 1) {
      node.innerHTML = node.textContent.replace(/(\S)/g, '<span>$1</span>');
      return node;
    }
  }
};
