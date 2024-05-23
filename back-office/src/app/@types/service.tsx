import ViewModel from '../view-models/service';

export interface ViewProps {
    data: resultData[];
    searchFilter: () => void;
    priceFilter: () => void;
    deleteService: (id: number) => void;
    isValidateFilter: () => void;
    acceptService: (id: number) => void;
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
    id: number;
    siret: string;
    is_valid: number;
    schedule: string;
}
