import ViewModel from "../view-models/service";

export interface ViewProps {
    filterByPrice: () => void;
    filterServiceByNameOrDescription: () => void;
    service: ServiceResponse[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: ServiceResponse[];
    serviceNoFilter: ServiceResponse[];
}


export interface ServiceResponse {
    id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    description_json: string;
    price: number;
    duration: number;
    nb_use?: number;
    type?: string;
    notation?: number;
}
