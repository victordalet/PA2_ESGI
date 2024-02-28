export interface User {
    email: string;
    password: string;
    name?: string;
    role?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    address?: string;
    token?: string;
    premium?: boolean;
}

export interface UserMessage {
    message: string;
    created_by: string;
    to_user: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
