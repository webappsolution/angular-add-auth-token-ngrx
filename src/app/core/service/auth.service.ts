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
    LoginCredentials,
    LoginResponse
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
        console.info(`login( Logging into API "${url}" with creds: ${params.username} / ${params.password} )`);

        return this.http.post(url, params).pipe(
            map((response: LoginResponse): Auth => {
                console.info(`loginSuccess( Received access token: ${response.accessToken} )`);
                return {
                    ...params,
                    token: response.accessToken
                };
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`loginFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
