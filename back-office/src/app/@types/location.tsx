import ViewModel from '../view-models/location';

export interface ViewProps {
    data: DataResponse[];
    searchFilter: () => void;
    capacityFilter: () => void;
    priceFilter: () => void;
    deleteLocation: (id: number) => void;
    isValidateFilter: () => void;
    acceptLocation: (id: number) => void;
}


export interface ControllerProps {
    viewModel: ViewModel;
}


export interface ControllerState {
    data: DataResponse[];
    dataNoFilter: DataResponse[];
}

export interface DataResponse {
    created_by: string;
    name: string;
    price : number;
    is_occupy_by : string;
    address : string;
    capacity : number;
    type : string;
    id: number
    is_valid: number;
}
