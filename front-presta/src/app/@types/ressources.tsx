import ViewModel from '../view-models/ressources';
import {Service} from "./service";

export interface ViewProps {
    service: Service[];
    location: any[];
    filterResourcesByNameOrDescription: () => void;
    filterResourcesByPrice: () => void;
    filterResourcesByType: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    location: any[];
    services: Service[];
    serviceNotFiltered: Service[];
    locationNotFiltered: any[];
}




