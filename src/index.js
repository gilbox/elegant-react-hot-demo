import React from 'react';
import App from './App';
import {fromJS} from 'immutable';
import Atom from './atom';

const state = fromJS({
  count: 0,
});

const atom = new Atom(state);

React.render(<App atom={atom} />, document.getElementById('root'));
