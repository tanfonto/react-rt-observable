const { is } = Object;

export const isPlainObject = (obj: object): obj is object =>
  is(obj.constructor, Object);
