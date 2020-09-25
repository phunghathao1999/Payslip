import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const validatorEndDate: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startdate = new Date(control.get('startDate').value);
  const enddate = new Date(control.get('endDate').value);
  return enddate < startdate ? { enddate: true } : null;
};

@Directive({
  selector: '[appendDateValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: endDateValidatorDirective, multi: true }
  ]
})

export class endDateValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return validatorEndDate(control);
  }
}
