export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Auth extends LoginCredentials {
    token: string;
}

export interface LoginResponse {
    accessToken: string;
}
