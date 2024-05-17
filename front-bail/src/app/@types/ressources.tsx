import ViewModel from '../view-models/ressources';
import {Location} from "./location";

export interface ViewProps {
    service: any[];
    location: Location[];
    filterResourcesByNameOrDescription: () => void;
    filterResourcesByPrice: () => void;
    filterResourcesByType: () => void;
    payLocation: (id: number) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    location: Location[];
    services: any[];
    serviceNotFiltered: any[];
    locationNotFiltered: Location[];
}




