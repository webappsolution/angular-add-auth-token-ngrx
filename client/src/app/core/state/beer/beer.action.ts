import { Action } from "@ngrx/store";
import { Beer } from "../../domain/beer.model";

export enum BeerActionTypes {
    GetBeers = "[Beer] GetBeers",
    GetBeersSuccess = "[Beer] GetBeersSuccess",
    GetBeersFault = "[Beer] GetBeersFault",

    Select = "[Beer] Select",
    Add = "[Beer] Add",
    Update = "[Beer] Update",
    Delete = "[Beer] Delete",
}

export class GetBeers implements Action {
    readonly type = BeerActionTypes.GetBeers;

    constructor() {
    }
}

export class GetBeersSuccess implements Action {
    readonly type = BeerActionTypes.GetBeersSuccess;

    constructor(public payload: Beer[]) {
    }
}

export class GetBeersFault implements Action {
    readonly type = BeerActionTypes.GetBeersFault;

    constructor(public errorMessage: string) {
    }
}

export class Select implements Action {
    readonly type = BeerActionTypes.Select;

    constructor(public payload: string) {
    }
}

export class Add implements Action {
    readonly type = BeerActionTypes.Add;

    constructor(public payload: Beer) {
    }
}

export class Update implements Action {
    readonly type = BeerActionTypes.Update;

    constructor(public payload: Beer) {
    }
}

export class Delete implements Action {
    readonly type = BeerActionTypes.Delete;

    constructor(public payload: Beer) {
    }
}

export type BeerActions =
    | GetBeers
    | GetBeersSuccess
    | GetBeersFault
    | Select
    | Add
    | Update
    | Delete
    ;
