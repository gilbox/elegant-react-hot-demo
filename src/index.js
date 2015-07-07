import React from 'react';
import App from './App';
import {fromJS} from 'immutable';
import Atom from './atom';

const state = module.hot.data ? module.hot.data.state :
  fromJS({
    count: 0,
  });

const atom = new Atom(state);

function render() {
  React.render(<App atom={atom} key={`${Math.random()}`} />, document.getElementById('root'));
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(data => data.state = atom.getState());
}

render();
