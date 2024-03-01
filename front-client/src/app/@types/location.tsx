import ViewModel from "../view-models/location";

export interface ViewProps {
    location: LocationResponse[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    location: LocationResponse[];
}


export interface LocationResponse {
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
    latitude: number;
    longitude: number;
    capacity: number;
    price: number;
    type: string;
    is_occupy_by?: string;
}