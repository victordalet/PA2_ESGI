import ViewModel from '../view-models/location';

export interface ViewProps {
    data: DataResponse[];
}


export interface ControllerProps {
    viewModel: ViewModel;
}


export interface ControllerState {
    data: DataResponse[];
}

export interface DataResponse {
    created_by: string;
    name: string;
    price : number;
    is_occupy_by : string;
    address : string;
    capacity : number;
    type : string;
}
