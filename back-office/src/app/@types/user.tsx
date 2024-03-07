import ViewModel from '../view-models/user';

export interface ViewProps {
    data: resultData[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface resultData {
    email: string;
    rules: string;
    address: string;
    premium: string;
}


export interface ControllerState {
    data: resultData[];
}