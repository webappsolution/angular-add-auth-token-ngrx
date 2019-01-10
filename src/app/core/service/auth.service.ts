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
    map,
} from "rxjs/operators";
import {
    Auth,
    LoginCredentials
} from "../state/auth/auth.model";
import { ApiEndpointService } from "./api-endpoint.service";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    /**
     * Constructor.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Attempt API authentication.
     */
    public login(loginCredentials: LoginCredentials): Observable<Auth> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.LOGIN);
        const params = {
            username: loginCredentials.username,
            password: loginCredentials.password
        };

        return this.http.post(url, params).pipe(
            map((response: any) => response),
            catchError((fault: HttpErrorResponse) => {
                console.error(`loginFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
