import ViewModel from "../view-models/accept";

export interface ViewProps {
    emails: string[];
    acceptEmail: (email: string) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;

}

export interface ControllerState {
    emails: string[];
}

