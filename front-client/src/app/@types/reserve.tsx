import ReserveViewModel from "../view-models/reserve";
import {LocationResponse} from "./location";

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
}

export interface ControllerProps {
    viewModel: ReserveViewModel;
}

export interface ControllerState {
    data: LocationResponse;
    services: ServiceResponse[];
    isReserved: boolean;
    notation: number;
    messages: MessageLocation[];
}


export interface ServiceResponse {
}


export interface MessageLocation {
    location_occupation_id?: number;
    message?: string;
}