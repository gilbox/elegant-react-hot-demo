import {stream,on} from 'flyd';

const history = [];

export default function timeTravelPlugin({
  state$=stream(),
  gotoHistoryState$=stream(),
  outputState=stream(),
  outputCount=stream()
}) {
  outputCount(history.length);  // for reloads

  on(state => {
    outputCount(history.push(state))
  }, state$);

  on(index => {
    if (index >= history.length) {
      throw Error(`Requested history index ${index} but there are only ${history.length} historic states.`)
    }
    outputState(state => history[index]);
  }, gotoHistoryState$);

  return {
    state$,
    gotoHistoryState$,
    outputState,
    outputCount
  }
}
