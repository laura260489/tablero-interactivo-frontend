export interface User {
    id: string;
    firstName: string;
    lastName: string;
    sub: string;
    frecuent: boolean;
    role: string[];
}

export interface AuthState {
    user: User | null;
}

export const initialAuthState: AuthState = {
    user: null,
};