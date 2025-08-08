export interface UserResponse {
    id: string;
    phone: string | null;
    first_name: string;
    last_name: string;
    email: string;
    frecuent?: boolean;
    full_name?: string;
    roles: string[];
}