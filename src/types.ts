import { Observable } from 'rxjs';
export type Pair<T0, T1 = T0> = [T0, T1];

export type Entry<T = any> = Pair<string, T>;
export interface Dictionary<T> {
  [key: string]: T;
  [key: number]: T;
}

export type Adjust<W0, W1, T extends object> = {
  [ K in keyof T ]: T[K] extends W0 ? W1 : T[K];
}

export type Func<T = any> = () => T;
export type Void = Func<void>;
export type Nullable<T> = T | null;
export type Nilable<T> = Nullable<T> | undefined;