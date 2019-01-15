import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from "@ngrx/store";
import { defaultBeer } from "../domain/beer.model";
import * as fromAuth from "./auth/auth.reducer";
import * as fromBeer from "./beer/beer.reducer";

export interface AppState {
    auth: fromAuth.AuthState;
    beer: fromBeer.BeerState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    beer: fromBeer.beerReducer
};

// -------------------------------------------------------------------
// AUTH SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getToken = createSelector(
    selectAuthState,
    fromAuth.getToken
);

export const getError = createSelector(
    selectAuthState,
    fromAuth.getError
);

export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);

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
        return beerId ? beerEntities[ beerId ] : defaultBeer;
    }
);
