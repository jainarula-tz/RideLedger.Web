import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Validator to ensure the value is a positive number (greater than 0)
   */
  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Don't validate empty values
      }

      const value = parseFloat(control.value);
      if (isNaN(value) || value <= 0) {
        return { positiveNumber: { value: control.value } };
      }

      return null;
    };
  }

  /**
   * Validator to ensure the number has at most the specified number of decimal places
   * @param maxDecimals Maximum number of decimal places allowed
   */
  static maxDecimals(maxDecimals: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Don't validate empty values
      }

      const value = control.value.toString();
      const decimalMatch = value.match(/\.(\d+)/);

      if (decimalMatch && decimalMatch[1].length > maxDecimals) {
        return {
          maxDecimals: {
            maxDecimals,
            actualDecimals: decimalMatch[1].length,
          },
        };
      }

      return null;
    };
  }

  /**
   * Validator to ensure the date is not in the future
   */
  static notFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Don't validate empty values
      }

      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today

      if (inputDate > today) {
        return { notFutureDate: { value: control.value } };
      }

      return null;
    };
  }

  /**
   * Validator to ensure the date is not in the past
   */
  static notPastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Don't validate empty values
      }

      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      if (inputDate < today) {
        return { notPastDate: { value: control.value } };
      }

      return null;
    };
  }

  /**
   * Validator to ensure a string matches a specific pattern
   * @param pattern Regular expression pattern
   * @param errorKey Custom error key (default: 'pattern')
   */
  static customPattern(pattern: RegExp, errorKey = 'customPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') {
        return null; // Don't validate empty values
      }

      if (!pattern.test(control.value)) {
        return { [errorKey]: { value: control.value, pattern: pattern.toString() } };
      }

      return null;
    };
  }
}
