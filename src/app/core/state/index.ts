import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { defaultBeer } from "./beer/beer.model";
import * as fromBeer from "./beer/beer.reducer";

export interface AppState {
    beer: fromBeer.BeerState;
}

export const reducers: ActionReducerMap<AppState> = {
    beer: fromBeer.beerReducer
};

// -------------------------------------------------------------------
// BEER SELECTORS
// -------------------------------------------------------------------
export const selectBeerState = createFeatureSelector<fromBeer.BeerState>("beer");

export const selectBeerIds = createSelector(
    selectBeerState,
    fromBeer.selectBeerIds
);
export const selectBeerEntities = createSelector(
    selectBeerState,
    fromBeer.selectBeerEntities
);
export const selectAllBeer = createSelector(
    selectBeerState,
    fromBeer.selectAllBeer
);
export const selectCurrentBeerId = createSelector(
    selectBeerState,
    fromBeer.getSelectedBeerId
);

export const selectCurrentBeer = createSelector(
    selectBeerEntities,
    selectCurrentBeerId,
    (beerEntities, beerId) => {
        return beerId ? beerEntities[beerId] : defaultBeer;
    }
);
