import ViewModel from '../view-models/service';

export interface ViewProps {
    data: resultData[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: resultData[];
}

export interface resultData {
    created_by: string;
    name: string;
    price: number;
    duration: number;
    nb_use: number;
}
