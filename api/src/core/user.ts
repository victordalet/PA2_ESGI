export interface User {
    email: string;
    password: string;
    name: string;
    role: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    address: string;
    token?: string;
}

export interface UserMessage {
    message: string;
    from: string;
    to: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
