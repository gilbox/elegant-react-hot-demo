import flyd, {stream} from 'flyd';
import timeTravelPlugin from './time-travel-plugin/';

window.stream = stream;

export default class Atoam {
  constructor(state) {
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
}
