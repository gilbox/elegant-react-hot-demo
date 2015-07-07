import {Component} from 'react';

const realSetState = Component.prototype.setState;
Component.prototype.setState = function patchedSetState(...args) {
  console.log('setState', args);
}
