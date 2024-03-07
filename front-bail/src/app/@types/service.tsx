import ViewModel from '../view-models/service';

export interface ViewProps {
    createService: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}


export interface Service {
    name: string;
    price: number;
    description: string;
    duration: number;
    created_by: string;
}

export interface ServiceForm {
    email: string;
    title: string;
    description: string;
    price: number;
    location: string;
    cat: string;
    duration: string;
}


