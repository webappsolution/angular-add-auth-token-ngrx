import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
    public static CONTEXT = "api/";

    /**
     * Map of contexts for API endpoints.
     */
    public static AUTH_CONTEXT = "auth/";

    /**
     * Map of API endpoints.
     */
    public static ENDPOINT = {
        LOGIN: `${ApiEndpointService.AUTH_CONTEXT}login/`,
        REGISTER: `${ApiEndpointService.AUTH_CONTEXT}register/`,
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
        const context: string = ApiEndpointService.CONTEXT;
        return `${protocol}${domain}${context}${endpoint}`;
    }

    /**
     * Determines if the requested URL is an authentication API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public static isAuthEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.AUTH_CONTEXT) > -1;
    }

    /**
     * Determines if the requested URL is an API endpoint.
     * @param {string} url
     * @returns {boolean}
     */
    public static isApiEndpoint(url: string = ""): boolean {
        return url.toLowerCase().indexOf(ApiEndpointService.CONTEXT) > -1;
    }
}
