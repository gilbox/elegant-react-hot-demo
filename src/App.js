import React, { Component } from 'react';
import {sub, elegant} from 'elegant-react';
import {fromJS} from 'immutable';
import Counter from './Counter';
import {on} from 'flyd';
import createCounterPlugin from './counter-plugin';

export default class App extends Component {
  constructor(props) {
    super(props);

    console.log('------constructor');
    const wiredUpdateStream = ::this.wiredUpdateStream;

    createCounterPlugin( this.incrementAction$ = stream(),
                         wiredUpdateStream('count') );

    // connect atom updates to component's state
    this.state = {state: props.atom.getState()};
    on(state => this.setState({state}), props.atom.stateDidUpdate$);
  }

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
    return <Counter value={state.get('count')} increment={this.incrementAction$}  />
  }
}
