export interface CustomJwtPayload {
    sub: string;
    user_id: string;
    first_name: string;
    last_name: string;
    frequent_user: boolean;
    role: string[];
    iat: number;
    exp: number;
}
