import ViewModel from '../view-models/service';

export interface ViewProps {
    createService: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    jobs: jobResponse[];
}

export interface ViewProps {
    jobs: jobResponse[];
    createService: () => void;
    getPictureBackground: () => void;
}


export interface Service {
    name: string;
    price: number;
    description: string;
    duration: number;
    created_by: string;
    id: number;
    type?: string;
    notation?: number;
    is_valid: number;
    schedule?: string;
    city: string;
    siret: string;
    is_vip: number;
}

export interface ServiceForm {
    email: string;
    title: string;
    description: string;
    price: number;
    location: string;
    cat: string;
    duration: string;
    siret?: string;
    city?: string
}

export interface jobResponse {
    id: number;
    name: string;
}