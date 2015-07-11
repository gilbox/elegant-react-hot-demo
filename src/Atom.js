import flyd, {on,stream} from 'flyd';
import timeTravelPlugin from './time-travel-plugin/';
import {Map as IMap} from 'immutable';
import {sub} from 'elegant-react';

window.stream = stream;

export default class Atoam {
  constructor(state) {
    this.wiredUpdateStreams = IMap({});
    this.state = state;

    // directly-updated state, used to update "watcher" App component
    this.didSetState$ = stream();

    // used to indicate "user" update
    this.didUpdateState$ = stream(state);

    // used to update state of the atom via stream pushes
    // ie., pushes to this._update$ will NOT trigger
    //      the this.didUpdateState$ stream
    this._update$ = stream();
    flyd.on(::this._updateState, this._update$);
  }

  _setState(state) {
    return this.didSetState$(this.state = state).val;
  }

  _updateState(transform) {
    return this._setState(this.state.update(transform));
  }

  getState() {
    return this.state;
  }

  updateState(transform) {
    return this.didUpdateState$(this._updateState(transform)).val;
  }

  // returns a stream into which you can push
  // transform functions (data -> data)
  wiredUpdateStream(...path) {
    // todo: watch for stream end and remove the stream from the array
    let s = this.wiredUpdateStreams.getIn(path);
    if (!s) this.wiredUpdateStreams.setIn(path, s = stream());
    else return s;

    on(sub(::this.updateState, ...path), s);
    return s;
  }
}
