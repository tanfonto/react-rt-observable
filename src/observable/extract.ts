import { isObservable, Observable, Subscribable } from 'rxjs';
import { Adjust, Entry, Pair } from '../types';
import { isPlainObject } from '../utils';
import { lift } from './category';

const { assign, defineProperty, entries } = Object;

export default function extract<
  P extends object,
  PA extends object = Adjust<Observable<any>, any, P>
>(props: P) {
  function boot(
    [head, ...tail]: Array<Entry>,
    [accumulator, subscribables]: [object, Subscribable<any>[]]
  ): Pair<object, Subscribable<any>[]> {
    if (head) {
      const [key, value] = head;

      if (isPlainObject(value)) {
        const [acc, subs] = boot(entries(value), [value, subscribables]);
        return boot(tail, [assign(accumulator, { [key]: acc }), subs]);
      }
      if (isObservable(value)) {
        const [id, subscribable] = lift(value);
        defineProperty(accumulator, key, { get: id, enumerable: true });
        return boot(tail, [accumulator, [...subscribables, subscribable]]);
      }
      return boot(tail, [{ ...accumulator, [key]: value }, subscribables]);
    }

    return [accumulator, subscribables];
  }

  return boot(entries(props), [{}, []]) as Pair<PA, Subscribable<any>[]>;
}
