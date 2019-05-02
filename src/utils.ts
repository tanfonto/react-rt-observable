import { Dictionary, Type, Pair } from './types';

const { assign, entries, values } = Object;

export const objOf = <T>(key: string, value: T) => ({ [key]: value });
export const merge = (...objects: object[]) => assign({}, ...objects);
export const fst = <T0 = any, T1 = T0>(tuple: Pair<T0, T1>) => tuple[0];
export const snd = <T0 = any, T1 = T0>(tuple: Pair<T0, T1>) => tuple[1];
export const pickOf = <T extends object, P>(obj: T, Ctor: Type<P>) =>
  entries(obj)
    .filter(entry => snd(entry) instanceof Ctor)
    .reduce<Dictionary<P>>(
      (acc, [key, val]) => assign(acc, objOf(key, val)),
      {}
    );
export const mapObj = <T = any, R = T>(obj: Dictionary<T>, xf: (arg: T) => R) =>
  merge(...entries(obj).map(([key, val]) => objOf(key, xf(val))));

export { entries, values };
