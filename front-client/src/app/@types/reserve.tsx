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
    eventCalendar: LocationOccupation[];
    fetchMessagesForBail: () => void;
    postMessageForBail: () => void;
    isService: boolean;
    downloadFactureBail: () => void;
    nameFiles: string[];
    postFileBail: () => void;
    downloadFileBail: (name: string) => void;
    deleteOccupationBail: (type: number) => void;
    bailIsOccupied: () => void;
    isAdmin: boolean;
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
    eventCalendar: LocationOccupation[];
    nameFiles: string[];
    isAdmin: boolean;
}

export interface LocationOccupation {
    id: number;
    from_datetime: string;
    to_datetime: string;
    user_email: string;
    repeat: string;
}


export interface MessageLocation {
    location_occupation_id?: number;
    message?: string;
}

export interface Subscription {
    id: number;
    created_at: string;
    price: number;
    user_email: string;
}

export interface SubscriptionUtilisation {
    id: number;
    email: string;
    last_date_free_service: string;
}