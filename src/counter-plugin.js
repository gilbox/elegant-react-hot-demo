import {on} from 'flyd';

export default function createCounterPlugin(
  incrementAction$,
  output$
) {
  on(increment => {
    output$( count => count+1 )
  }, incrementAction$);
}
