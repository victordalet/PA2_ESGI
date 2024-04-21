import ViewModel from "../view-models/element";

export interface ViewProps {
    postElement: () => void;
    postJob: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}
