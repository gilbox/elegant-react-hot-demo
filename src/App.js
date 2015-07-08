import React, { Component } from 'react';
import {sub} from 'elegant-react';
import Counter from './Counter';
import {on, stream} from 'flyd';
import counterPlugin from './counter-plugin';

const colors = ['#218C8D','#6CCECB','#F9E559','#EF7126','#8EDC9D','#473E3F'];
const colorCount = colors.length;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {state: props.atom.getState()};
  }

  componentWillMount() {
    const {atom} = this.props;
    const wiredUpdateStream = ::this.wiredUpdateStream;
    const state = atom.getState();

    this.incrementActionStreams =
      state.get('counts').map((_,i) =>
        counterPlugin(stream(), wiredUpdateStream('counts', i))
      ).toArray();

    // connect atom updates to component's state
    on(state => this.setState({state}), atom.didSetState$);
  }

  // returns a stream into which you can push
  // transform functions (data -> data)
  wiredUpdateStream(...path) {
    const s = stream();
    on(sub(::this.edit, ...path), s);
    return s;
  }

  edit(transform) {
    this.props.atom.updateState(transform);
  }

  render() {
    const {state} = this.state;

    return <div>
      {state.get('counts').map((count,index) =>
        <Counter
          key={index}
          value={count}
          color={colors[index%colorCount]}
          increment={this.incrementActionStreams[index]}  />
      ).toArray()}
    </div>
  }
}
