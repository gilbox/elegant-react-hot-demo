import flyd, {stream} from 'flyd';
import timeTravelPlugin from './time-travel-plugin/';

window.stream = stream;

const subStream = (dataStream, ...path) =>
  flyd.map(data => data.getIn(path), dataStream);

export default class Atoam {
  constructor(state) {
    this.state = state;

    // used to update "watcher" App component
    this.didSetState$ = stream();

    this.didUpdateState$ = stream(state);



    // used to set state of the atom via stream writes
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
