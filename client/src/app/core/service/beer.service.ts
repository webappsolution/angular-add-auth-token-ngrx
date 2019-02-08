import {
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Observable,
    throwError
} from "rxjs";
import {
    catchError,
    map
} from "rxjs/operators";
import { Beer } from "../domain/beer.model";
import { ApiEndpointService } from "./api-endpoint.service";

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
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.BEER);
        console.info(`getAll( Getting all beers from API "${url}". )`);

        return this.http.get(url).pipe(
            map((response: Beer[]) => {
                console.info(`getAllSuccess( Received all ${(response || []).length} beers. )`);
                return response;
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
