import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';

const inc = x => x + 1;

const styles = {
  counter: {
    fontSize: '50px',
    fontFamily: 'Verdana',
    fontWeight: 1000,
    cursor: 'pointer',
    padding: '20px'
  }
}

@elegant
export default class Counter extends Component {
  render() {
    const {value,increment} = this.props;

    return (
      <div onClick={increment} style={styles.counter}>
        {value}
      </div>
    );
  }
}
