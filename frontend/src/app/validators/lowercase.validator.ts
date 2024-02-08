import {AbstractControl, ValidatorFn} from '@angular/forms'

export function lowercaseValidator(): ValidatorFn{
    return (control: AbstractControl) => {
        const hasLowerCase = /[a-z]/.test(control.value)
        if(hasLowerCase){
            return null
        }
        return {hasNoLowerCase: true}
    }
}