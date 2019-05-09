import { Observable } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';
import { Func, Nullable } from '../types';

export function lift<T = any>(
  source: Observable<T>
): [Func, Observable<Nullable<T>>] {
  let emission: Nullable<T> = null;
  const container = source.pipe(
    startWith(emission),
    tap(val => (emission = val))
  );
  const id = function() {
    return emission;
  };
  return [ id, container ];
}
