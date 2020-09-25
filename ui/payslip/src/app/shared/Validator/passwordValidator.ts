import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password').value;
  const configpassword = control.get('configpassword').value;
  return password == configpassword ? null : { configpassword: true };
};

@Directive({
  selector: '[apppasswordValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: passwordValidatorDirective, multi: true }
  ]
})

export class passwordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordValidator(control);
  }
}
