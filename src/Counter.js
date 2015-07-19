import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import {TransitionSpring} from 'react-motion';

const inc = x => x + 1;

const styles = {
  row: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    width: '100%',
    cursor: 'pointer',
  },
  anchor: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    position: 'absolute'
  },
  counter: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'inline-block',
    verticalAlign: 'bottom',
    fontSize: '30px',
    fontFamily: 'Verdana',
    fontWeight: 1000,
    cursor: 'pointer',
    margin: '2px'
  }
}


@elegant
export default class Counter extends Component {
  static defaultProps = {
    height: 'auto',
    color: 'green'
  }

  getValues() {
    const configs = {};
    for (let i=0; i<this.props.value+1; i++) {
      configs[i] = {opacity: {val:1},
                     offset: {val:0, config: [90, 17]}}
    }
    return configs;

    // todo: react-motion doesn't support arrays anymore:
    // return Array(this.props.value+1)
    //         .fill({opacity: {val:1},
    //                 offset: {val:0, config: [90, 17]}});
  }

  willEnter(key) {
    return {
      opacity: {val: 0},
      offset: {val: 100}
    };
  }

  willLeave(key, destVals, currVals) {
    if (currVals[key].opacity.val > 0) {
      return {
        opacity: {val: 0},
        offset: {val: 100}
      };
    }
  }

  render() {
    const {value,increment,height,color} = this.props;

    return (
      <div onClick={increment} style={this.props.style}>
        <TransitionSpring
          endValue={this.getValues()}
          willLeave={::this.willLeave}
          willEnter={::this.willEnter}>
        {configs =>
            <div style={{...styles.row, height}}>
              { configs::map(({offset,opacity}, key) => // todo: change to configs.map if react-motion ever supports arrays
                <div key={key}
                  style={{...styles.counter,
                    background: color,
                    transform: `translateX(${offset.val}vw)`,
                    opacity: opacity.val }} />)}
            </div>
        }</TransitionSpring>
      </div>
    )
  }
}

function map(fn) {
  return Object.keys(this).map(key => fn(this[key], key));
}
