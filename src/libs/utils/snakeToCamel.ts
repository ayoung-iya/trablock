/* eslint-disable no-param-reassign */
type FunctionType = (...args: any) => any;

type CamelCaseString<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCaseString<U>>}`
  : S;

type SnakeCaseString<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${T}${SnakeCaseString<U>}`
    : `${T}_${Uncapitalize<SnakeCaseString<U>>}`
  : S;

export type CamelCase<T> = T extends FunctionType
  ? T
  : T extends Array<infer U>
    ? Array<CamelCase<U>>
    : T extends Record<string, any>
      ? { [K in keyof T as CamelCaseString<Extract<K, string>>]: CamelCase<T[K]> }
      : T;

export type SnakeCase<T> =
  T extends Array<infer U>
    ? Array<SnakeCase<U>>
    : T extends Record<string, any>
      ? { [K in keyof T as SnakeCaseString<Extract<K, string>>]: SnakeCase<T[K]> }
      : T;

const convertSnakeToCamel = (string: string) => {
  return string.replaceAll(/_[a-z]/g, (match) => match[1].toUpperCase());
};

const convertCamelToSnake = (string: string) => {
  return string.replaceAll(/[A-Z]/g, (match) => `_${match.toLocaleLowerCase()}`);
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

export const changeKeysToSnakeCase = <T>(object: T): SnakeCase<T> => {
  if (Array.isArray(object)) {
    return object.map((item) => changeKeysToSnakeCase(item)) as SnakeCase<T>;
  }

  if (object !== null && typeof object === 'object') {
    return Object.keys(object).reduce((newObject, key) => {
      const newKey = convertCamelToSnake(key);
      (newObject as any)[newKey] = changeKeysToSnakeCase((object as any)[key]);
      return newObject;
    }, {} as SnakeCase<T>);
  }

  return object as SnakeCase<T>;
};
