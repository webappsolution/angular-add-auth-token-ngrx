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
import { LoginCredentials } from "../../core/domain/auth.model";
import * as FormUtil from "../../util/form.util";

@Component({
    selector: "blog-login",
    templateUrl: "./login.component.html",
    styleUrls: [ "./login.component.scss" ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
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
     * Dispatches an event to perform login.
     */
    @Output()
    public login: EventEmitter<LoginCredentials> = new EventEmitter<LoginCredentials>();

    /**
     * Dispatches an event to switch to the registration view.
     */
    @Output()
    public register: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Reference to the login form.
     */
    public loginForm: FormGroup;

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
        this.loginForm = new FormGroup(
            this.formBuilder.group({
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
    public getFormValue(): LoginCredentials {
        return {
            username: FormUtil.getFormFieldValue(this.loginForm, "username"),
            password: FormUtil.getFormFieldValue(this.loginForm, "password")
        };
    }

    /**
     * Handles the form submission and emits a login event with the user's credentials.
     * @param event
     */
    public onLogin(event: any) {
        const payload: LoginCredentials = this.getFormValue();
        console.log(`onLogin( username: ${payload.username}, password: ${payload.password} )`);
        this.login.emit(payload);
    }

    /**
     * Emits an event to route the user to the registration view.
     * @param event
     */
    public onRegister(event: any) {
        console.log(`onRegister()`);
        this.register.emit();
    }
}
