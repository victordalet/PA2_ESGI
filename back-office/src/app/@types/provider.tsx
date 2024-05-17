import ViewModel from "../view-models/provider";
import {LocationAvailability} from "./occupation";

export interface ViewProps {
    service: ServiceResponse[];
    provider: ProviderInfoTable[];
    user: UserRequest[];
    filterUserByService: () => void;
    reservedService: () => void;
    eventCalendar: EventCalendar[];
    updateCalendar: (providerId: number) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: ServiceResponse[];
    provider: ProviderInfoTable[];
    providerNoFilter: ProviderInfoTable[];
    user: UserRequest[];
    userNoFilter: UserRequest[];
    eventCalendar: EventCalendar[];
}

export interface EventCalendar {
    title: string;
    start: string;
    end: string;
}


export interface ServiceResponse {
    id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    description_json: string;
    price: number;
    duration: number;
    nb_use?: number;
    type?: string;
    notation?: number;
    city: string;
}


export interface ProviderInfoTable {
    created_by: string;
    name: string;
    price: number;
    duration: number;
    nb_use: number;
    id: number;
    siret: string;
    is_valid: number;
    city: string;
    description: string;
    schedule: string;
    type: string;
}

export interface Schedule {
    [day: string]: {
        start: string;
        end: string;
    };
}

export interface UserRequest {
    id: number;
    location_occupation_id: number;
    service_name: string;
    user_email: string;
    description: string;
    status: string;
    city: string;
    from_datetime: string;
    to_datetime: string;
    is_vip: number;
}

