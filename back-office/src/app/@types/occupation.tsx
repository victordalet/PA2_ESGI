import OccupationViewModel from "../view-models/occupation";

export interface ViewProps {
    data: LocationAvailability[];
    filterOccupationMessage: () => void;
    filterOccupation: () => void;
    downloadFolderClientOccupation: (location_occupation_id: number) => void;
    launchPopUpState: (from: string, to: string, location_occupation_id: number, email: string, name: string) => void;
    closePopUpState: () => void;
    acceptLocationOccupation: () => void;
    refuseLocationOccupation: (location_occupation_id: number) => void;
}

export interface ControllerProps {
    viewModel: OccupationViewModel;
}

export interface ControllerState {
    data: LocationAvailability[];
    dataNotFiltered: LocationAvailability[];
}


export interface LocationAvailability {
    location_id: number;
    from_datetime: string;
    to_datetime: string;
    notation?: number;
    location_occupation_id: number;
    price: number;
    repeat?: string;
    nb_message?: number;
    location_name: string;
    user_email: string;
    created_by: string;
    city: string;
    description: string;
    status: string;
    latitude: number;
    longitude: number;
    state_place: string;
}