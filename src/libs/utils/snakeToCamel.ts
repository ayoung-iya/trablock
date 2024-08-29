/* eslint-disable no-param-reassign */
type CamelCaseString<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCaseString<U>>}`
  : S;

export type CamelCase<T> =
  T extends Array<infer U>
    ? Array<CamelCase<U>>
    : T extends Record<string, any>
      ? { [K in keyof T as CamelCaseString<Extract<K, string>>]: CamelCase<T[K]> }
      : T;

const convertSnakeToCamel = (string: string) => {
  return string.replaceAll(/_[a-z]/g, (match) => match[1].toUpperCase());
};

export const changeKeysToCamelCase = <T>(object: T): CamelCase<T> => {
  if (Array.isArray(object)) {
    return object.map((item) => changeKeysToCamelCase(item)) as CamelCase<T>;
  }

  if (object !== null && typeof object === 'object') {
    return Object.keys(object).reduce((newObject, key) => {
      const newKey = convertSnakeToCamel(key);
      (newObject as any)[newKey] = changeKeysToCamelCase((object as any)[key]);
      return newObject;
    }, {} as CamelCase<T>);
  }

  return object as CamelCase<T>;
};
