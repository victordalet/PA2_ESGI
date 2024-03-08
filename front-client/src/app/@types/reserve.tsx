import ReserveViewModel from "../view-models/reserve";
import {LocationDescription, LocationResponse} from "./location";
import {ServiceResponse} from "./service";

export interface ViewProps {
    data: LocationResponse;
    services: ServiceResponse[];
    isReserved: boolean;
    fetchReservations: () => void;
    addNotation: (note: number) => void;
    notation: number;
    messages: MessageLocation[];
    addMessage: () => void;
    deleteOccupation: () => void;
    downloadFacture: () => void;
    isBail?: boolean;
    deleteLocation: () => void;
    description: LocationDescription;
    servicesGlobal: ServiceResponse[];
    addService: (index: number, id: number) => void;
    servicesSelected: ServiceResponse[];
}

export interface ControllerProps {
    viewModel: ReserveViewModel;
}

export interface ControllerState {
    data: LocationResponse;
    services: ServiceResponse[];
    servicesGlobal: ServiceResponse[];
    servicesSelected: ServiceResponse[];
    isReserved: boolean;
    notation: number;
    messages: MessageLocation[];
    isBail?: boolean;
    description: LocationDescription;
}


export interface MessageLocation {
    location_occupation_id?: number;
    message?: string;
}