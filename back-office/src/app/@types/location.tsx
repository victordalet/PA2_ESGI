import ViewModel from '../view-models/location';

export interface ViewProps {
    data: string[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}


export interface ControllerState {
    data: string[];
}