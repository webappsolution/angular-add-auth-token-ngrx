import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from "@angular/core";
import {
    FormBuilder,
    FormGroup
} from "@angular/forms";
import { RegisterCredentials } from "../../core/domain/auth.model";
import * as FormUtil from "../../util/form.util";

@Component({
    selector: "blog-register",
    templateUrl: "./register.component.html",
    styleUrls: [ "./register.component.scss" ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    /**
     * An optional error message to display if login failed.
     */
    @Input()
    public error = "";

    /**
     * Flag indicating if login is pending.
     */
    @Input()
    public pending = false;

    /**
     * Dispatches an event to perform register.
     */
    @Output()
    public register: EventEmitter<RegisterCredentials> = new EventEmitter<RegisterCredentials>();

    /**
     * Dispatches an event to cancel registration.
     */
    @Output()
    public cancel: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Reference to the register form.
     */
    public registerForm: FormGroup;

    /**
     * Constructor
     */
    constructor(private formBuilder: FormBuilder) {
    }

    /**
     * Initializes the component by building the form.
     *
     * TODO: BMR: 01/10/2019: Add form validation in a future post.
     */
    public ngOnInit(): void {
        this.registerForm = new FormGroup(
            this.formBuilder.group({
                firstName: [
                    ""
                    // [
                    //     Validators.required,
                    //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.FIRST_NAME.MAX_LENGTH)
                    // ]
                ],
                lastName: [
                    ""
                    // [
                    //     Validators.required,
                    //                     //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.FIRST_NAME.MAX_LENGTH)
                    // ]
                ],
                username: [
                    ""
                    // [
                    //     Validators.required,
                    //     Validators.email
                    // ]
                ],
                password: [
                    ""
                    // [
                    //     Validators.required,
                    //     Validators.maxLength(ValidationUtil.VALIDATION_RULE.PASSWORD.MAX_LENGTH)
                    // ]
                ]
            }).controls,
            {
                updateOn: "blur"
            }
        );
    }

    /**
     * Accessor for the form's value, aka the data container object representing the
     * form field's current values.
     */
    public getFormValue(): RegisterCredentials {
        return {
            firstName: FormUtil.getFormFieldValue(this.registerForm, "firstName"),
            lastName: FormUtil.getFormFieldValue(this.registerForm, "lastName"),
            username: FormUtil.getFormFieldValue(this.registerForm, "username"),
            password: FormUtil.getFormFieldValue(this.registerForm, "password")
        };
    }

    /**
     * Handles the form submission and emits a register event with the user's registration credentials.
     * @param event
     */
    public onRegister(event: any) {
        const payload: RegisterCredentials = this.getFormValue();
        console.log(`onRegister( username: ${payload.username}, password: ${payload.password} )`);
        this.register.emit(payload);
    }

    /**
     * Routes the user back to the login screen.
     * @param event
     */
    public onCancel(event: any) {
        console.log(`onCancel()`);
        this.cancel.emit();
    }
}
