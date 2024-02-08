import {AbstractControl, ValidatorFn} from '@angular/forms'

export function specialcharValidator(): ValidatorFn{
    return (control: AbstractControl) => {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value)
        if(hasSpecialChar){
            return null
        }
        return {hasNoSpecialChar: true}
    }
}