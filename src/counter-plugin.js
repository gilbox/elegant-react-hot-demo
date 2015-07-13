import {stream, on} from 'flyd';

const inc = x => x + 1;

export default function counterPlugin(
  output=stream(),
  incrementAction$=stream()
) {
  on(action => output(inc), incrementAction$);
  return {output, incrementAction$};
}
