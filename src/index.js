import React from 'react';
import App from './App';
import {fromJS} from 'immutable';
import Atom from './atom';

const atom = (module.hot.data && module.hot.data.atom) || new Atom(fromJS({
  count: 0,
}));

function render() {
  React.render(<App atom={atom} key={`${Math.random()}`} />, document.getElementById('root'));
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(data => data.atom = atom);
}

render();
