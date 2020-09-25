export class Account {
    id: number;
    username: string;
    password: string;
    active = false;
    token: string;
    roles: string;
    refreshToken: string;
}