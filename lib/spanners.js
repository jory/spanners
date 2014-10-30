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

  var numChildNodes = node.childNodes.length;
  var numChildren = node.children.length;

  if (numChildNodes === 0) {
    return node;

  } else if (numChildNodes === 1 && numChildren === 0) {
    node.innerHTML = node.textContent.replace(/(\S)/g, '<span>$1</span>');
    return node;

  } else if (numChildNodes >= numChildren) {
    var childNodes = toArray(node.childNodes);
    var nodes = [];

    childNodes.forEach(function (child) {
      if (child.nodeType === child.TEXT_NODE) {
        var inside = node.cloneNode();
        inside.innerHTML = child.textContent.replace(/(\S)/g, '<span>$1</span>');
        toArray(inside.childNodes).forEach(function (inner) {
          nodes.push(inner);
        });
      } else {
        nodes.push(exports.squirrel(child));
      }
    });

    var clone = node.cloneNode();

    nodes.forEach(function (child) {
      clone.appendChild(child);
    });

    return clone;
  }
};
