import ViewModel from "../view-models/ticket";

export interface ViewProps {
    createTicket: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
}
