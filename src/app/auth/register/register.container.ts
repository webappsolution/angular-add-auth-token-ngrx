import {
    Component,
    OnInit
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { RegisterCredentials } from "../../core/domain/auth.model";
import * as fromState from "../../core/state";
import * as AuthActions from "../../core/state/auth/auth.action";

@Component({
    selector: "blog-register-container",
    template: `
		<blog-register
				[error]="error$ | async"
				[pending]="pending$ | async"
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
    public error$: Observable<string>;

    /**
     * Flag indicating if register is pending.
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
     * Attempt to register.
     */
    public register(event: RegisterCredentials) {
        this.store$.dispatch(new AuthActions.Register(event));
    }

    /**
     * Cancel registration and head back to login.
     */
    public cancel(event: any) {
        this.store$.dispatch(new AuthActions.NavigateToLogin());
    }
}
