import React, { Component } from 'react';
import {sub} from 'elegant-react';
import Counter from './Counter';
import {on, stream} from 'flyd';
import counterPlugin from './counter-plugin';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setup(props);
    this.state = {state: props.atom.getState()};
  }

  setup({atom}) {
    const wiredUpdateStream = ::this.wiredUpdateStream;

    counterPlugin( this.incrementAction$ = stream(),
                   wiredUpdateStream('count') );

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
    return <Counter
            value={state.get('count')}
            increment={this.incrementAction$}  />
  }
}
