import {
    FormControl,
    FormGroup
} from "@angular/forms";

/**
 * Accessor for a given form field's value by control name.
 * @return The form control's value.
 */
export function getFormFieldValue(formGroup: FormGroup, formControlName: string, defaultValue: any = ""): any {
    return getFormControl(formGroup, formControlName).value;
}

/**
 * Setter for a given form field's value by control name.
 * @return The form control's value.
 */
export function setFormFieldValue(formGroup: FormGroup, formControlName: string, value: any = ""): void {
    return getFormControl(formGroup, formControlName).setValue(value);
}

/**
 * Accessor for a given form field by control name.
 * @return The form control.
 * @throws Error indicating that incorrect or nonexistent form control name.
 */
export function getFormControl(formGroup: FormGroup, formControlName: string): FormControl {
    if (formGroup instanceof FormGroup === false) {
        throw new Error(`No form group with name "${String(formGroup)}".`);
    }
    const control: FormControl = formGroup.controls[ formControlName ] as FormControl;
    if (!control) {
        throw new Error(`No form control with name "${formControlName}".`);
    }
    return control;
}
