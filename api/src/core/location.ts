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
}

export interface LocationUser {
    location_id: number;
    user_id: number;
}

export interface LocationNotation {
    location_id: number;
    user_id: number;
    notation: number;
}

export interface LocationAvailability {
    location_id: number;
    from_datetime: string;
    to_datetime: string;
}

