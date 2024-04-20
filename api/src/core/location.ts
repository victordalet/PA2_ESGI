export interface Location {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by?: string;
    name: string;
    picture?: string;
    description: string;
    accepted?: boolean;
    address: string;
    latitude?: number;
    longitude?: number;
    capacity: number;
    price: number;
    type: string;
    is_occupy_by?: string;
    location_occupation_id?: number;
    description_json?: string;
    icons?: string;
    is_valid?: number;
}

export interface LocationAvailability {
    location_id: number;
    from_datetime?: string;
    to_datetime?: string;
    notation?: number;
    location_occupation_id?: number;
    price: number;
    repeat?: string;
    nb_message?: number;
}


export interface LocationMessage {
    location_occupation_id: number;
    message: string;
}

export interface LocationLiaison {
    service_id: number;
    location_id?: number;
    location_occupation_id?: number;
    from_datetime?: string;
    to_datetime?: string;
}

