import ViewModel from '../view-models/Home';
import {ServiceResponse} from "./service";
import {LocationResponse} from "./location";

export interface ViewProps {
    service: ServiceResponse[];
    location: LocationResponse[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: ServiceResponse[];
    location: LocationResponse[];
}




