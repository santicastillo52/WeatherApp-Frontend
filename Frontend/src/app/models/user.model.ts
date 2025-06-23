export interface User {
    id: number;
    name: string;
    email: string;
    last_login: string;
    created_at: string;
}

export interface LoginUser {
    email: string;
    password: string;

}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    repeatPassword?: string;

}