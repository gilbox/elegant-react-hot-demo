import 'core-js/shim';  // for Array.fill
import React from 'react';
import App from './App';
import {fromJS} from 'immutable';
import Atom from './atom';
import timeTravelPlugin from './time-travel-plugin/'
import TimeTravelControlPanel from './time-travel-plugin/ControlPanel';

// initial app state
const state = module.hot && module.hot.data ? module.hot.data.state :
  fromJS({
    sort: false,
    sortOrder: -1,
    compact: false,
    counts: [0,0,0,0,0,0,0,0,0]
  });

const atom = window.atom = new Atom(state);

hotRender(<App atom={atom} />, 'root');

// setup time travel and control panel

const {outputCount: historyCount$, gotoHistoryState$} =
  timeTravelPlugin( {state$: atom.didUpdateState$,
                outputState: ::atom.silentlyUpdateState });

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

function hotRender(element, id) {
  const node = document.getElementById(id);
  React.unmountComponentAtNode(node);
  React.render(element, node);
}
