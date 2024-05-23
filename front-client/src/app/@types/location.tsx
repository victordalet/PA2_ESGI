import ViewModel from "../view-models/location";
import {locationType} from "./Home";

export interface ViewProps {
    location: LocationResponse[];
    filterByPrice: () => void;
    filterLocationByNameOrDescription: () => void;
    filterLocationByCity: () => void;
    filterLocationByCapacity: () => void;
    locationTypes: locationType[];
    selected: any[];
    handleChangeSelected: (selected: any) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    location: LocationResponse[];
    locationNoFilter: LocationResponse[];
    locationTypes: locationType[];
    selected: any[];
}


export interface LocationResponse {
    id: number;
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
    icons?: string;
    is_valid: number;
}

export interface LocationDescription {
    typeConcierge: string
    address: string
    country: string
    type: string
    typeLocation: string
    numberRoom: number
    surface: number
    nameFounder: string
    email: string
    telephone: string
    time: any[]
    service: ServiceLocationDescription[];
    room: string;
    bathroom: string;
    kitchen: string;
    parking: string;
}

export interface ServiceLocationDescription {
    name: string
    price: number
    id: number
}


