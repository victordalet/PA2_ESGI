import ViewModel from "../view-models/sign";

export interface ViewProps {
    signIn: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}
