import ViewModel from '../view-models/inventory';
import {LocationAvailability} from "./occupation";

export interface ViewProps {
    inventory: LocationAvailability[];
    inventoryState: Inventory[];
    addInventory: () => void;
    generatePDF: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    inventory: LocationAvailability[];
    inventoryState: Inventory[];
}

export interface Inventory {
    name: string;
    state: string;
    description: string;
}