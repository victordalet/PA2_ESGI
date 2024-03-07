import ViewModel from '../view-models/ressources';
import {Service, Location} from "./location";

export interface ViewProps {
    service: Service[];
    location: Location[];
    filterResourcesByNameOrDescription: () => void;
    filterResourcesByPrice: () => void;
    filterResourcesByType: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    location: Location[];
    services: Service[];
    serviceNotFiltered: Service[];
    locationNotFiltered: Location[];
}




