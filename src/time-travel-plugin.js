import {on} from 'flyd';

export default function createTimeTravelPlugin(
  state$,
  gotoHistoryState$,
  outputState$,
  outputCount$
) {
  const history = [];

  on(state => {
    outputCount$(history.push(state))
    console.log('history', history);
  }, state$);

  on(index => {
    if (index >= history.length) {
      throw Error(`Requests history index ${index} but there are only ${history.length} historic states.`)
    }
    outputState$(state => history[index]);
  }, gotoHistoryState$);
}
