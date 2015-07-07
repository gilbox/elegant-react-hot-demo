import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import Scrubber from './Scrubber';
import {on} from 'flyd';

const inc = x => x + 1;

const styles = {
  main: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    backgroundColor: '#eee',
    padding: '10px',
  },
  scrubber: {
    width: '100%',
    boxSizing: 'border-box',
  }
}

@elegant
export default class ControlPanel extends Component {
  static defaultProps = { }

  constructor(props) {
    super(props);

    this.state = { historyIndex: 1, historyCount: props.historyCount$() }
  }

  componentDidMount() {
    const {historyCount$} = this.props;
    on(count => this.setState({ historyCount: count,
                                historyIndex: count }), historyCount$);
  }

  handleChangeValue(value) {
    if (!value) return;
    this.setState({ historyIndex: value });
    this.props.gotoHistoryState$(value-1);
  }

  render() {
    const {historyIndex, historyCount} = this.state;
    const {min,max,value,onChange,name} = this.props;

    return <div style={styles.main}>
      <Scrubber
        style={styles.scrubber}
        min={1}
        max={historyCount}
        value={historyIndex}
        onChangeValue={::this.handleChangeValue} />
    </div>
  }
}
