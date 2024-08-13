/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-syntax */
import {
  registerDecorator, ValidationOptions, ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsAllPhoneNumbersConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    // Split the string into an array of tokens.
    const tokens = value.split(/\W+/);

    // Iterate over the tokens and check if each token is a valid phone number.
    for (const token of tokens) {
      // Use a regular expression to check if the token is a valid phone number.
      const regex = /^\d{10}$/;
      if (!regex.test(token)) {
        return false;
      }
    }

    // If all tokens are valid phone numbers, return true.
    return true;
  }
}

export function IsAllPhoneNumbers(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsAllPhoneNumbers',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsAllPhoneNumbersConstraint,
    });
  };
}
