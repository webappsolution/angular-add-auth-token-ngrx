import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { appRoutePaths } from "../../app.routes";
import { RegisterCredentials } from "../../core/domain/auth.model";
import * as AuthActions from "../../core/state/auth/auth.action";
import * as RouterActions from "../../core/state/router/router.action";

/*
<ehr-register
        [errorMessage]="errorMessage$ | async"
        [pending]="registerPending$ | async"
        (register)="register($event)"
    >
    </ehr-register>
 */

@Component({
    selector: "blog-register-container",
    template: `
    <blog-register
        (register)="register($event)"
        (cancel)="cancel($event)"
    >
    </blog-register>
    `
})
export class RegisterContainer implements OnInit {
    /**
     * The possible register error.
     */
    // public errorMessage$: Observable<Auth0Error>;

    /**
     * Flag indicating if register is pending.
     */
    // public registerPending$: Observable<boolean>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {}

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        // this.errorMessage$ = this.store$.pipe(select(fromAuth.getRegisterError));
        // this.registerPending$ = this.store$.pipe(select(fromAuth.isRegisterPending));
    }

    /**
     * Attempt to register.
     */
    public register(event: RegisterCredentials) {
        this.store$.dispatch(new AuthActions.Register(event));
    }

    /**
     * Cancel registration and head back to login.
     */
    public cancel(event: any) {
        this.store$.dispatch(new RouterActions.Go({ path: appRoutePaths.login }));
    }
}
