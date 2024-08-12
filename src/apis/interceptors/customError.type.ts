export interface CustomError {
  local_message: string;
  code: 0;
  field_errors: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
}
