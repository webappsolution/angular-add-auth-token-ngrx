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
import {
    Auth,
    AuthResponse,
    LoginCredentials,
    RegisterCredentials
} from "../domain/auth.model";
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
     * Attempt authentication.
     */
    public login(loginCredentials: LoginCredentials): Observable<Auth> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.LOGIN);
        const params = {
            username: loginCredentials.username,
            password: loginCredentials.password
        };
        console.info(`login( Logging into API "${url}" with creds: ${params.username} / ${params.password} )`);

        return this.http.post(url, params).pipe(
            map((response: AuthResponse): Auth => {
                console.info(`loginSuccess( Received access token: ${response.accessToken} )`);
                return {
                    ...params,
                    token: response.accessToken
                };
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`loginFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }

    /**
     * Attempt new user registration.
     */
    public register(credentails: RegisterCredentials): Observable<Auth> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.REGISTER);
        const params = {
            username: credentails.username,
            password: credentails.password,
            firstName: credentails.firstName,
            lastName: credentails.lastName
        };
        console.info(`register( Registering new user with API "${url}" with creds: ${params.username} / ${params.password} )`);

        return this.http.post(url, params).pipe(
            map((response: AuthResponse): Auth => {
                console.info(`registerSuccess( Received access token: ${response.accessToken} )`);
                return {
                    ...params,
                    token: response.accessToken
                };
            }),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`registerFault( ${fault.error.message} )`);
                return throwError(fault);
            })
        );
    }
}
