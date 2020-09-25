import { AbstractControl } from '@angular/forms';

export class employeeValidator {
    public static checkBirthday(control: AbstractControl): {[key: string]: any} | null{
        const birthday = control.value;
        const newDay =  new Date();
        const d1 = new Date(birthday);
        const d2 = new Date(newDay);
        if(birthday == '' || d1 <= d2){
            return null;
        }
        return { curentDay: true };
    }
    public static checkFullName(control: AbstractControl): {[key: string]: any} | null{
        const fullName: string = control.value;
        if(fullName == '' || !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(fullName)){
            return null;
        }
        return { specialCharacter: true };
    }
}