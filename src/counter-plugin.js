import {on} from 'flyd';

const inc = x => x + 1;

export default function counterPlugin(
  incrementAction$,
  output$
) {
  on(action => output$(inc), incrementAction$);
  return incrementAction$;
}
