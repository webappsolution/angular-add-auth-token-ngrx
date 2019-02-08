import {
    createEntityAdapter,
    EntityAdapter,
    EntityState
} from "@ngrx/entity";
import { Beer } from "../../domain/beer.model";
import {
    BeerActions,
    BeerActionTypes
} from "./beer.action";

/**
 * Interface to the part of the Store containing BeerState
 * and other information related to BeerData.
 */
export interface BeerState extends EntityState<Beer> {
    selectedBeerId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Beer> = createEntityAdapter<Beer>();

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: BeerState = adapter.getInitialState({
    // additional entity state properties
    selectedBeerId: null
});

export function beerReducer(state = initialState, action: BeerActions): BeerState {
    switch (action.type) {
        case BeerActionTypes.Select: {
            return Object.assign({}, state, { selectedBeerId: action.payload });
        }

        case BeerActionTypes.GetBeersSuccess: {
            return adapter.addAll(action.payload, state);
        }

        case BeerActionTypes.Add: {
            return adapter.addOne(action.payload, state);
        }

        case BeerActionTypes.Update: {
            return adapter.upsertOne(action.payload, state);
        }

        case BeerActionTypes.Delete: {
            return adapter.removeOne(action.payload.id, state);
        }

        default:
            return state;
    }
}

export const getSelectedBeerId = (state: BeerState) => state.selectedBeerId;

// Entity selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of beer ids
export const selectBeerIds = selectIds;

// select the dictionary of beer entities
export const selectBeerEntities = selectEntities;

// select the array of beers
export const selectAllBeer = selectAll;

// select the total beer count
export const selectBeerTotal = selectTotal;
