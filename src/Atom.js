import flyd, {stream} from 'flyd';
import createTimeTravelPlugin from './time-travel-plugin';

window.stream = stream;

const subStream = (dataStream, ...path) =>
  flyd.map(data => data.getIn(path), dataStream);

export default class Atom {
  constructor(state) {
    this.state = state;

    // used to update "watcher" App component
    this.stateDidUpdate$ = stream();

    this._updateState$ = stream(state);
    this._historyCount$ = stream();

    flyd.on(count => console.log('count', count), this._historyCount$);

    window.goto = this.gotoHistoryState$ = stream();

    // used to set state of the atom via stream writes
    this._update$ = stream();
    flyd.on(::this._updateState, this._update$);

    createTimeTravelPlugin( this._updateState$,
                            this.gotoHistoryState$,
                            this._update$,
                            this._historyCount$ );

  }

  gotoHistoryState(index) {
    this.gotoHistoryState$(index);
  }

  _setState(state) {
    return this.stateDidUpdate$(this.state = state).val;
  }

  _updateState(transform) {
    return this._setState(this.state.update(transform));
  }

  getState() {
    return this.state;
  }

  updateState(transform) {
    return this._updateState$(this._updateState(transform)).val;
  }
}
