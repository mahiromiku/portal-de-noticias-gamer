import {AbstractControl, ValidatorFn} from '@angular/forms'

export function nospaceValidator(): ValidatorFn{
    return (control: AbstractControl) => {
        const value: string = control.value;
        const hasNoSpace = value && value.indexOf(' ') === -1;
        if(hasNoSpace){
            return null
        }
        return {hasSpace: true}
    }
}