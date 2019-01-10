export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    firstName: string;
    lastName: string;
}

export interface Auth extends LoginCredentials {
    token: string;
}

export interface LoginResponse {
    accessToken: string;
}
