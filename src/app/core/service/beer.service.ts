import {
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Observable,
    throwError
} from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Beer } from "../state/beer/beer.model";

@Injectable({
    providedIn: "root"
})
export class BeerService {
    /**
     * Constructor.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Requests a list of yummy beers from the API.
     */
    public getAll(): Observable<Beer[]> {
        const url = "beers";

        return this.http.get(url).pipe(
            map((response: any) => response.data),
            catchError((fault: HttpErrorResponse) => {
                console.error(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
