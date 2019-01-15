import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import {
    ActivatedRoute,
    NavigationExtras,
    Router
} from "@angular/router";
import {
    Actions,
    Effect,
    ofType
} from "@ngrx/effects";
import {
    Action,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import {
    map,
    tap
} from "rxjs/operators";
import * as RouterActions from "./router.action";
import {
    Go,
    RouterActionTypes
} from "./router.action";

@Injectable()
export class RouterEffect {
    /**
     * Navigate the user to the requested route AND preserve the query string params.
     */
    @Effect({ dispatch: false })
    navigate$: Observable<Action> = this.actions$.pipe(
        ofType<Go>(RouterActionTypes.Go),
        map((action) => action.payload),
        tap((data) => {
            const extras: NavigationExtras = { ...data.extras };
            this.router.navigate([ data.path ], extras);
        })
    );

    /**
     * Navigate the user back in browser history.
     */
    @Effect({ dispatch: false })
    navigateBack$: Observable<Action> = this.actions$.pipe(
        ofType<RouterActions.Back>(RouterActionTypes.Back),
        tap(() => this.location.back())
    );

    /**
     * Navigate the user back in browser history.
     */
    @Effect({ dispatch: false })
    navigateForward$: Observable<Action> = this.actions$.pipe(
        ofType<RouterActions.Forward>(RouterActionTypes.Forward),
        tap(() => this.location.forward())
    );

    /**
     * Constructor
     */
    constructor(
        private actions$: Actions,
        private store$: Store<any>,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute
    ) {
    }
}
