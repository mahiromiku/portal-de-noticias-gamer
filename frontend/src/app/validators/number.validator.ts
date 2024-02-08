import {AbstractControl, ValidatorFn} from '@angular/forms'

export function numberValidator(): ValidatorFn{
    return (control: AbstractControl) => {
        const hasNumber = /[0-9]/.test(control.value)
        if(hasNumber){
            return null
        }
        return {hasNoNumber: true}
    }
}