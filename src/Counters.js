import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import Counter from './Counter';
import derive, {track} from './derive-decorator';
import Spring from 'react-motion';

const colors = ['#218C8D','#6CCECB','#F9E559','#EF7126','#8EDC9D','#473E3F'];
const colorCount = colors.length;
const config = [80,13];

@elegant
@derive({
  @track('counts', 'sortOrder')
  items({counts, sortOrder}) {
    // map `counts` object indexes to sort order
    const order =
      counts.keySeq().sortBy(index =>
        sortOrder*counts.get(index)
      ).toKeyedSeq().flip().toObject();

    // convert to array with tweenable sortOrder property
    return counts.map( (count, index) => ({
      count,
      index,
      sortOrder: { val: order[index], config }
    }) ).toArray();
  }
}, true) // true enables debug mode
export default class Counters extends Component {
  render() {
    const {items,incrementActionStreams,lineHeight} = this.props;

    return <div>
      <Spring endValue={items}>
      { tweens =>
        tweens.map((item,index) =>
            <Counter
              key={index}
              style={{ top: lineHeight * item.sortOrder.val, position: 'absolute', left: 0 }}
              value={item.count}
              color={colors[index%colorCount]}
              increment={incrementActionStreams[index]} /> )
      }</Spring>
    </div>
  }
}
