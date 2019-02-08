import {
    Component,
    OnInit
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { Beer } from "../core/domain/beer.model";
import * as fromState from "../core/state";
import * as BeerAction from "../core/state/beer/beer.action";

@Component({
    selector: "blog-beer-list-container",
    template: `
	    <blog-beer-list
            [beers]="beers$ | async"
	    >
	    </blog-beer-list>
    `
})
export class BeerListContainer implements OnInit {
    /**
     * The username for the currently logged in user.
     */
    public beers$: Observable<Beer[]>;

    /**
     * Constructor.
     */
    public constructor(private store$: Store<any>) {
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        this.beers$ = this.store$.pipe(select(fromState.selectAllBeer));
        this.store$.dispatch(new BeerAction.GetBeers());
    }
}
