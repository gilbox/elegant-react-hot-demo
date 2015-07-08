import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import {TransitionSpring} from './react-animation/Spring';

const inc = x => x + 1;

const styles = {
  row: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    width: '100%',
    cursor: 'pointer',
    // background: '#efefef'
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
    const {value} = this.props;
    const configs = {};

    for (let i = 0; i < value+1; i++) {
      configs[i] = {opacity: {val:1}, offset: {val:0, config: [150, 20]}}
    }
    return configs;
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
      <div onClick={increment}>
        <TransitionSpring endValue={::this.getValues()} willLeave={::this.willLeave} willEnter={::this.willEnter}>
        {configs =>
            <div style={{...styles.row, height}}>
              {Object.keys(configs).map(key =>
                <div style={{...styles.counter, background: color, transform: `translateX(${configs[key].offset.val}vw)`, opacity: configs[key].opacity.val }} key={key}></div>)}
            </div>
        }</TransitionSpring>
      </div>
    )
  }
}
