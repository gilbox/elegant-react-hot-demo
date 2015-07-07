import {on} from 'flyd';

const history = [];

export default function createTimeTravelPlugin(
  state$,
  gotoHistoryState$,
  outputState$,
  outputCount$
) {
  on(state => {
    outputCount$(history.push(state))
  }, state$);

  on(index => {
    if (index >= history.length) {
      throw Error(`Requested history index ${index} but there are only ${history.length} historic states.`)
    }
    outputState$(state => history[index]);
  }, gotoHistoryState$);
}
