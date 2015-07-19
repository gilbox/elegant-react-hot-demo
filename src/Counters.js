import React, {Component} from 'react';
import {elegant, sub} from 'elegant-react';
import Counter from './Counter';
import {derive, track} from 'react-derive';
import {Spring} from 'react-motion';

const colors = ['#218C8D','#6CCECB','#F9E559','#EF7126','#8EDC9D','#473E3F'];
const colorCount = colors.length;
const config = [150,13];

@elegant
@derive({
  @track('counts', 'sortOrder')
  items({counts, sortOrder, incrementActionStreams}) {
    // map `counts` object indexes to sort order
    const order =
      counts.keySeq().sortBy(index =>
        sortOrder*counts.get(index)
      ).toKeyedSeq().flip().toObject();

    // convert to array with tweenable sortOrder property
    return counts.map( (count, index) => ({
      count,  // todo: simplify these
      color: colors[index%colorCount],
      increment: { val: incrementActionStreams[index], config: [] }, // <-- using an un-@track-ed prop
      sortOrder: { val: order[index], config },
    }) ).toArray();
  }
}, true) // true enables debug mode
export default class Counters extends Component {
  render() {
    const {items,incrementActionStreams,lineHeight} = this.props;

    return <div>
      <Spring endValue={items}>
      { tweens =>
        <div>
          {tweens.map(({count,sortOrder,color,increment},index) =>
            <Counter
              key={index}
              style={{ top: lineHeight * sortOrder.val, position: 'absolute', left: 0 }}
              value={count}
              color={color}
              increment={increment.val} /> )}
        </div>
      }</Spring>
    </div>
  }
}
