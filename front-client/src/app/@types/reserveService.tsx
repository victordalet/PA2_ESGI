import ReserveServiceViewModel from "../view-models/reserveService";
import {ServiceResponse} from "./service";
import {LocationResponse} from "./location";
import {LocationOccupation} from "./reserve";

export interface ViewProps {
    service: ServiceResponse
    postNotation: (notation: number) => void;
    isCreator: boolean | undefined;
    deleteService: () => void;
    generateFacture: () => void;
    deleteLocation: (id: number) => void;
    location: LocationResponse[];
    eventCalendar: LocationOccupation[];
}

export interface ControllerProps {
    viewModel: ReserveServiceViewModel;
}

export interface ControllerState {
    service: ServiceResponse;
    isCreator: boolean | undefined;
    location: LocationResponse[];
    eventCalendar: LocationOccupation[];
}

export interface aboutCommission {
    price_min: number;
    price_max: number;
    commission: number;
}