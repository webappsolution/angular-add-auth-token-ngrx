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
export class ApiEndpointService {
    /**
     * Map of protocols for API endpoints.
     */
    public static PROTOCOL = {
        HTTP: "http://",
        HTTPS: "https://"
    };

    /**
     * Map of domains for API endpoints.
     */
    public static DOMAIN = {
        LOCAL_DEV: "localhost:4301/"
    };

    /**
     * Map of contexts for API endpoints.
     */
    public static CONTEXT = {
        LOCAL_DEV: ""
    };
    /**
     * Map of API endpoints.
     */
    public static ENDPOINT = {
        BEER: "beer/"
    };

    /**
     * Constructor.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Constructs an API endpoint.
     *
     * NOTE: In the future this could construct API endpoints using environmental configs provided
     * at build time or at runtime via (for example) query string params...but for now we'll
     * keep this dumb simple.
     */
    public static getEndpoint(endpoint: string): string {
        const protocol: string = ApiEndpointService.PROTOCOL.HTTP;
        const domain: string = ApiEndpointService.DOMAIN.LOCAL_DEV;
        const context: string = ApiEndpointService.CONTEXT.LOCAL_DEV;
        return `${protocol}${domain}${context}${endpoint}`;
    }
}
