import React, { Component } from 'react';
import {sub} from 'elegant-react';
import Counters from './Counters';
import {on, stream} from 'flyd';
import counterPlugin from './counter-plugin';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.edit = ::this.edit;
    this.state = {state: props.atom.getState()};
  }

  componentWillMount() {
    const {atom} = this.props;
    const state = atom.getState();

    this.incrementActionStreams =
      state.get('counts').map((_,i) =>
        counterPlugin(stream(), atom.wiredUpdateStream('counts', i))
      ).toArray();

    // connect atom updates to component's state
    on(state => this.setState({state}), atom.didSetState$);
  }

  edit(transform) {
    this.props.atom.updateState(transform);
  }

  render() {
    const {state} = this.state;
    const sort = state.get('sort');
    const sortOrder = state.get('sortOrder');
    const compact = state.get('compact');
    const toggleSort = sub(this.edit, 'sort');
    const toggleSortOrder = sub(this.edit, 'sortOrder');
    const toggleCompact = sub(this.edit, 'compact');

    return <div>
      <label style={{ position: 'absolute', top: 5, right: 50}}>
        <input type="checkbox" value={sort}
               onChange={event => toggleSort(v => !v)}/>
        sort
      </label>
      <label style={{ position: 'absolute', top: 5, right: 100}}>
        <input type="checkbox" value={sortOrder===1} disabled={!sort}
               onChange={event => toggleSortOrder(v => -v)}/>
        sort asc
      </label>
      <label style={{ position: 'absolute', top: 5, right: 180}}>
        <input type="checkbox" value={compact}
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
