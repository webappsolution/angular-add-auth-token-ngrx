import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import * as fromState from "../../core/state/";
import * as AuthActions from "../state/auth/auth.action";

@Injectable()
export class AuthRouteGuard implements CanActivate {
    constructor(private store$: Store<any>) {}

    /**
     * Determines if the user is authenticated and can navigate to protected routes.
     *
     * If the user isn't authenticated, then route them to the login view.
     *
     * @returns {Observable<boolean>}
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStoreAuthentication().pipe(
            map((authed) => {
                if (!authed) {
                    this.store$.dispatch(new AuthActions.NavigateToLogin());
                    console.log(`canActivate( No. Redirect the user back to login. )`);
                    return false;
                }

                console.log(`canActivate( Yes. Navigate the user to the requested route. )`);
                return true;
            }),
            first()
        );
    }

    /**
     * Determine if the user is logged by checking the Redux store.
     */
    private checkStoreAuthentication(): Observable<boolean> {
        return this.store$.pipe(select(fromState.getIsLoggedIn)).pipe(first());
    }
}
