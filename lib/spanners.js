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

  } else if (numChildNodes === 1 && numChildren === 0) {
    node.innerHTML = node.textContent.replace(/(\S)/g, '<span>$1</span>');
    return node;

  } else if (numChildNodes >= numChildren) {
    var clone = node.cloneNode();
    var nodes = [];

    childNodes.forEach(function (child) {

      if (child.nodeType === child.TEXT_NODE) {
        child.innerHTML = child.textContent.replace(/(\S)/g, '<span>$1</span>');
        nodes.push(child);
      } else {
        nodes.push(exports.squirrel(child));
      }
    });

    nodes.forEach(function (child) {
      clone.appendChild(child);
    });

    return clone;
  }
};
