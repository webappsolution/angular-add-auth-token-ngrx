import {
    Component,
    OnInit
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { LoginCredentials } from "../../core/domain/auth.model";
import * as fromState from "../../core/state/";
import * as AuthActions from "../../core/state/auth/auth.action";

@Component({
    selector: "blog-login-container",
    template: `
		<blog-login
				[error]="error$ | async"
				[pending]="pending$ | async"
				(login)="login($event)"
				(register)="register($event)"
		>
		</blog-login>
    `
})
export class LoginContainer implements OnInit {
    /**
     * The possible login error.
     */
    public error$: Observable<string>;

    /**
     * Flag indicating if login is pending.
     */
    public pending$: Observable<boolean>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        this.error$ = this.store$.pipe(select(fromState.getError));
        this.pending$ = this.store$.pipe(select(fromState.getPending));
    }

    /**
     * Attempt to login.
     */
    public login(event: LoginCredentials) {
        this.store$.dispatch(new AuthActions.Login(event));
    }

    /**
     * Switch to register view.
     */
    public register(event: any) {
        this.store$.dispatch(new AuthActions.NavigateToRegister());
    }
}
