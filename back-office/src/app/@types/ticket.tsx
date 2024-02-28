import ViewModel from '../view-models/ticket';

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
    created_at: string;
    created_by: string;
    name: string;
    status: string;
    occupy_by: string;
}