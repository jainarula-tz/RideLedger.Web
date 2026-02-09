import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * CORE - Service
 * Centralizes validation error message generation for forms
 */
@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  /**
   * Gets the first error message for a form control
   */
  getErrorMessage(control: AbstractControl | null, fieldName: string = 'This field'): string {
    if (!control || !control.errors) {
      return '';
    }

    const errors: ValidationErrors = control.errors;

    // Standard Angular validators
    if (errors['required']) {
      return `${fieldName} is required`;
    }

    if (errors['email']) {
      return `Please enter a valid email address`;
    }

    if (errors['minlength']) {
      return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    }

    if (errors['maxlength']) {
      return `${fieldName} must not exceed ${errors['maxlength'].requiredLength} characters`;
    }

    if (errors['min']) {
      return `${fieldName} must be at least ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `${fieldName} must not exceed ${errors['max'].max}`;
    }

    if (errors['pattern']) {
      return `${fieldName} format is invalid`;
    }

    // Custom validators
    if (errors['positiveNumber']) {
      return `${fieldName} must be greater than 0`;
    }

    if (errors['maxDecimals']) {
      return `Maximum ${errors['maxDecimals'].maxDecimals} decimal places allowed`;
    }

    if (errors['notFutureDate']) {
      return `${fieldName} cannot be in the future`;
    }

    if (errors['notPastDate']) {
      return `${fieldName} cannot be in the past`;
    }

    if (errors['customPattern']) {
      return errors['customPattern'].message || `${fieldName} format is invalid`;
    }

    // Generic error
    return `${fieldName} is invalid`;
  }

  /**
   * Checks if a control has errors and is touched/dirty
   */
  shouldShowError(control: AbstractControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
