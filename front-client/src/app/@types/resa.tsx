import ViewModel from "../view-models/resa";
import {LocationResponse} from "./location";

export interface ViewProps {
    data: LocationResponse[];
    locationOccupationServiceRequest: LocationOccupationServiceRequest[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: LocationResponse[];
    locationOccupationServiceRequest: LocationOccupationServiceRequest[];
}

export interface LocationOccupationServiceRequest {
    location_occupation_id: number;
    user_email: string;
    status: string;
}