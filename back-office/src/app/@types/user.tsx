import ViewModel from '../view-models/user';

export interface ViewProps {
    data: resultData[];
    searchFilter: () => void;
    isPremiumFilter: () => void;
    ruleFilter: () => void;
    deleteUser: (email: string) => void;
    addAdmin: (email: string) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface resultData {
    email: string;
    rules: string;
    address: string;
    premium: string;
}


export interface ControllerState {
    data: resultData[];
    dataNoFilter: resultData[];
}