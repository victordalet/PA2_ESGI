import ViewModel from "../view-models/premium";

export interface ViewProps {
    subscribe: (price: number) => void;
    deleteSubscription: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}
