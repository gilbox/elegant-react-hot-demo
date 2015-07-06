import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import Counter from './Counter';

// this file isn't being used for now

@elegant({statics: ['edit']})
export default class Home extends Component {
  render() {
    const {state,edit,increment} = this.props;

    return (
      <div>
        <h1>Counter</h1>
        <Counter value={state.get('count')} edit={sub(edit, 'count')} increment={increment} />
      </div>
    );
  }
}
