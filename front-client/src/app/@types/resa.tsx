import ViewModel from "../view-models/resa";
import {LocationResponse} from "./location";

export interface ViewProps {
    data: LocationResponse[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: LocationResponse[];
}
