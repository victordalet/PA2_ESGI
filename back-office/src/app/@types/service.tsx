import ViewModel from '../view-models/service';

export interface ViewProps {
    data: resultData[];
    searchFilter: () => void;
    priceFilter: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: resultData[];
    dataNoFilter: resultData[];
}

export interface resultData {
    created_by: string;
    name: string;
    price: number;
    duration: number;
    nb_use: number;
}
