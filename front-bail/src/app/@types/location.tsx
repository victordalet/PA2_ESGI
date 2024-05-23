import ViewModel from '../view-models/location';

export interface ViewProps {
    resetChoiceConcierge: (numberSelected: number) => void;
    allSelectedRadioContact: () => void;
    storeFormInJSON: () => void;
    activeStep2: () => void;
    validationCaptcha: (value: any) => void;
    getPredictYolo: () => void;
    openOrCloseOpener: (index: number) => void;
    locationTypes: locationType[];
    addTypeLocation: (type: string, id: number, idView: number) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    price: number;
    locationTypes: locationType[];
    selectedLocationTypes: locationType[];
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
    description: string;
    room: string;
    bathroom: string;
    kitchen: string;
    parking: string;
    privacy?: boolean;
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
    is_valid: number;
}


export interface YoloResponse {
    price: number;
    image: string;
}

export interface locationType {
    id: number;
    name: string;
    pictureUrl?: string;
}