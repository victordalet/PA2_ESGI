import ReserveServiceViewModel from "../view-models/reserveService";
import {ServiceResponse} from "./service";

export interface ViewProps {
    service: ServiceResponse
    postNotation: (notation: number) => void;
    isCreator: boolean | undefined;
    deleteService: () => void;
}

export interface ControllerProps {
    viewModel: ReserveServiceViewModel;
}

export interface ControllerState {
    service: ServiceResponse;
    isCreator: boolean | undefined;
}
