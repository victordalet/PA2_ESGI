import ViewModel from '../view-models/inventory';
import {LocationAvailability} from "./occupation";

export interface ViewProps {
    inventory: LocationAvailability[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    inventory: LocationAvailability[];
}
