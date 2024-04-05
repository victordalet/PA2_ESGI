import ViewModel from "../view-models/settings";

export interface ViewProps {
    changeEmail: () => void;
    changePassword: () => void;
    changeUsername: () => void;
    data: resultData;
    deleteUser: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    data: resultData[];
}


export interface resultData {
    email: string;
    token: string;
    rules: string;
    name: string;
}
