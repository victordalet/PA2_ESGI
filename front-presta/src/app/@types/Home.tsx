import ViewModel from '../view-models/Home';

export interface ViewProps {
    typeUser: string;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: any[];
    location: any[];
    typeUser: string;
}




