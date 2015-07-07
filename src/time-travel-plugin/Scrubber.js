import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';

const inc = x => x + 1;

const styles = {
  controlRange: { display: 'inline-block', lineHeight: '30px', verticalAlign: 'middle', width: 'calc(100% - 60px)' },
  controlValue: { display: 'inline-block', lineHeight: '30px', verticalAlign: 'middle', color: 'grey', fontSize: '11px', width: '50px', paddingLeft: '5px' }
}

@elegant
export default class Scrubber extends Component {
  static defaultProps = { value: 0, min: 0, max: 100, name: null }

  render() {
    const {min,max,value,onChangeValue,name} = this.props;

    return <div {...this.props}>
      <input type="range" min={min} max={max} style={styles.controlRange}
        value={value}
        onChange={event => onChangeValue(event.target.value) }/>
      <div style={styles.controlValue}>{value} of {max}</div>
    </div>
  }
}
