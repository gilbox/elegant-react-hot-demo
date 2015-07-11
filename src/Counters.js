import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import Counter from './Counter';
import derive, {track} from './derive-decorator';
import Spring from 'react-motion';

const colors = ['#218C8D','#6CCECB','#F9E559','#EF7126','#8EDC9D','#473E3F'];
const colorCount = colors.length;

@elegant
@derive({
  @track('counts', 'sortOrder')
  items({counts, sortOrder}) {
    // map counts object indexes to sort order
    const sortedIndex =
      counts.keySeq().sortBy(index =>
        sortOrder*counts.get(index)).toKeyedSeq().flip().toObject();

    // convert to object with tweenable sortOrder property
    return counts.map( (count, index) => ({
      config: [80,13],
      val: {
        count: {val:count, config: []},
        index: {val:index, config: []},
        sortOrder: sortedIndex[index]
      }
    }) ).toObject();
  }
}, true) // true enables debug mode
export default class Counters extends Component {
  render() {
    const {items,incrementActionStreams,lineHeight} = this.props;

    return <div>
      <Spring endValue={items}>
      { tweens =>
        Object.keys(tweens).map(index => {
          const item = tweens[index];
          return  (
            <Counter
              key={index}
              style={{ top: lineHeight * item.val.sortOrder, position: 'absolute', left: 0 }}
              value={item.val.count.val}
              color={colors[index%colorCount]}
              increment={incrementActionStreams[index]} /> )
        })
      }</Spring>
    </div>
  }
}
