import { Observable } from 'rxjs';

export interface Type<T, A extends any[] = any[]> extends Function {
  new (...args: A): T;
}

export interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}

export type Pair<T0, T1 = T0> = [T0, T1];

export type Nilable<T> = T | null | undefined;

export type ObservableLike<T> = T | Observable<T> & { value?: T };
