import ViewModel from '../view-models/location';
import {Service} from "./service";

export interface ViewProps {
    resetChoiceConcierge: (numberSelected: number) => void;
    allSelectedRadioContact: () => void;
    storeFormInJSON: () => void;
    service: Service[];
    activeStep2: () => void;
    addServiceToForm: (service: LocationService, index: number) => void;
    validationCaptcha: (value: any) => void;
    getPredictYolo: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: Service[];
    serviceSelected: LocationService[];
    price: number;
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
    service?: LocationService[];
}

export interface Location {
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
}

export interface LocationService {
    id?: number;
    name: string;
    price: number;
}

export interface YoloResponse {
    price: number;
    image: string;
}
