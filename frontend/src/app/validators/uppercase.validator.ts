import {AbstractControl, ValidatorFn} from '@angular/forms'

export function uppercaseValidator(): ValidatorFn{
    return (control: AbstractControl) => {
        const hasUpperCase = /[A-Z]/.test(control.value)
        if(hasUpperCase){
            return null
        }
        return {hasNoUpperCase: true}
    }
}