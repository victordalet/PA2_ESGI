import ViewModel from "../view-models/element";

export interface ViewProps {
    postElement: () => void;
    postJob: () => void;
    updatePrice: (name: string) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}
