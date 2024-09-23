export interface CustomError {
  localMessage: string;
  code: 0;
  fieldErrors: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}
