export interface Provider {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    accepted?: boolean;
}

export interface ProviderAvailability {
    provider_id: number;
    from_datetime: string;
    to_datetime: string;
};