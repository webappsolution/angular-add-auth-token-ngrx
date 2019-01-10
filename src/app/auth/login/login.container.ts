import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoginCredentials } from "../../core/state/auth/auth.model";
import * as AuthActions from "../../core/state/auth/auth.action";

/*
<ehr-login
        [errorMessage]="errorMessage$ | async"
        [pending]="loginPending$ | async"
        (login)="login($event)"
    >
    </ehr-login>
 */

@Component({
    selector: "blog-login-container",
    template: `
    <blog-login
        (login)="login($event)"
    >
    </blog-login>
    `
})
export class LoginContainer implements OnInit {
    /**
     * The possible login error.
     */
    // public errorMessage$: Observable<Auth0Error>;

    /**
     * Flag indicating if login is pending.
     */
    // public loginPending$: Observable<boolean>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {}

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        // this.errorMessage$ = this.store$.pipe(select(fromAuth.getLoginError));
        // this.loginPending$ = this.store$.pipe(select(fromAuth.isLoginPending));
    }

    /**
     * Attempt to login.
     */
    public login(event: LoginCredentials) {
        this.store$.dispatch(new AuthActions.Login(event));
    }
}
