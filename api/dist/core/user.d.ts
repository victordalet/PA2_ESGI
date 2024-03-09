export interface User {
    email?: string;
    password?: string;
    name?: string;
    rules?: string;
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
export interface StatsUser {
    nb_users: number;
    nb_remove_user: number;
    nb_premium: number;
    nb_users_created_this_week: number[];
}
