export interface Service {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    nb_use?: number;
    notation?: number;
}

export interface ServiceOther {
    service_id: number;
    other_id: number;
}

export interface SubscriptionUtilisation {
    id?: number;
    email: string;
    last_date_free_service: string;
}