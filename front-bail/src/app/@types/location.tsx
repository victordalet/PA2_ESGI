import ViewModel from '../view-models/location';

export interface ViewProps {
    resetChoiceConcierge: (numberSelected: number) => void;
    allSelectedRadioContact: () => void;
    storeFormInJSON: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}

export interface FormLocation {
    typeConcierge: string;
    address: string;
    country: string;
    type: string;
    typeLocation: string;
    numberRoom: number;
    surface: number;
    nameFounder: string;
    email: string;
    telephone: string;
    time: number[];
    service?: Service[];
}

export interface Service {
    name: string;
    price: number;
    description: string;
    duration: number;
}

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
}


