import React, { Component } from 'react';
import {sub} from 'elegant-react';
import Counters from './Counters';
import {on, stream} from 'flyd';
import counterPlugin from './counter-plugin';


export default class App extends Component {
  constructor(props) {
    super(props);
    const {atom} = this.props;

    this.edit = ::atom.updateState;
    this.state = {state: atom.getState()};
  }

  componentWillMount() {
    const {atom} = this.props;
    const state = atom.getState();

    this.incrementActionStreams =
      state.get('counts').map((_,i) =>
        counterPlugin(sub(this.edit, 'counts', i)).incrementAction$
      ).toArray();

    // connect atom updates to component's state
    on(state => this.setState({state}), atom.didSetState$);
  }

  render() {
    const {state} = this.state;
    const {edit} = this;

    const sort = state.get('sort');
    const sortOrder = state.get('sortOrder');
    const compact = state.get('compact');
    const toggleSort = sub(edit, 'sort');
    const toggleSortOrder = sub(edit, 'sortOrder');
    const toggleCompact = sub(edit, 'compact');

    return <div>
      <label style={{ position: 'absolute', top: 5, right: 50}}>
        <input type="checkbox" checked={sort}
               onChange={event => toggleSort(v => !v)}/>
        sort
      </label>
      <label style={{ position: 'absolute', top: 5, right: 100}}>
        <input type="checkbox" checked={sortOrder===1}
               onChange={event => {
                toggleSort(v => true);
                toggleSortOrder(v => -v)}}/>
        sort asc
      </label>
      <label style={{ position: 'absolute', top: 5, right: 180}}>
        <input type="checkbox" checked={compact}
               onChange={event => toggleCompact(c => !c)}/>
        compact
      </label>
      <Counters
        lineHeight={compact ? 30 : 40}
        sortOrder={sortOrder * ~~sort}
        counts={state.get('counts')}
        incrementActionStreams={this.incrementActionStreams} />
    </div>
  }
}
