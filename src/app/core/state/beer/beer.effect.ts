import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { BeerService } from "../../service/beer.service";
import {
    BeerActionTypes,
    GetBeers,
    GetBeersFault,
    GetBeersSuccess
} from "./beer.action";
import { Beer } from "./beer.model";

@Injectable()
export class BeerEffect {
    /**
     * Load up some yummy brews.
     */
    @Effect()
    search$: Observable<Action> = this.actions$.pipe(
        ofType<GetBeers>(BeerActionTypes.GetBeers),
        exhaustMap(() =>
            this.beerService.getAll().pipe(
                map((data: Beer[]) => new GetBeersSuccess(data)),
                catchError((err: HttpErrorResponse) => of(new GetBeersFault({ message: err.message })))
            )
        )
    );

    /**
     * Constructor
     */
    constructor(private actions$: Actions, private store$: Store<any>, private beerService: BeerService) {}
}
