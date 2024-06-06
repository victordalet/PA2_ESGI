import ViewModel from "../view-models/element";

export interface ViewProps {
    postElement: () => void;
    postJob: () => void;
    updatePrice: (name: string) => void;
    updateRules: (name: string) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}

export interface SubElement {
    price: number;
    free: number;
    reduce: number;
}