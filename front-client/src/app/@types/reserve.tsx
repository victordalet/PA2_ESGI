import ReserveViewModel from "../view-models/reserve";
import {LocationResponse} from "./location";

export interface ViewProps {
    data: LocationResponse;
    services: ServiceResponse[];
}

export interface ControllerProps {
    viewModel: ReserveViewModel;
}

export interface ControllerState {
    data: LocationResponse;
    services: ServiceResponse[];
}


export interface ServiceResponse {
}
