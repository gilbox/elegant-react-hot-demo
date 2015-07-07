import React from 'react';
import App from './App';
import {fromJS} from 'immutable';
import Atom from './atom';
import timeTravelPlugin from './time-travel-plugin/'
import TimeTravelControlPanel from './time-travel-plugin/ControlPanel';

const state = module.hot.data ? module.hot.data.state :
  fromJS({
    count: 0,
  });

const atom = new Atom(state);
const node = document.getElementById('root');

React.unmountComponentAtNode(node);
React.render(<App atom={atom} />, node);

// setup time travel and control panel
const historyCount$ = stream();
const gotoHistoryState$ = window.goto = stream();

timeTravelPlugin( atom.didUpdateState$,
                  gotoHistoryState$,
                  atom._update$,  // <-- "private", but we need direct access
                  historyCount$ );

React.render(<TimeTravelControlPanel
                historyCount$={historyCount$}
                gotoHistoryState$={gotoHistoryState$} />,
             document.getElementById('time-travel-plugin'))

// setup HMR
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(data => {
    data.state = atom.getState();
  });
}
