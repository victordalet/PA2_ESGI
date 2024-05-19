import ViewModel from "../view-models/premium";

export interface ViewProps {
    subscribe: (price: number) => void;
    deleteSubscription: () => void;
    price: ModelPrice[];
}


export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    price: ModelPrice[];
}

export interface ModelPrice {
    price: number;
    name: string;
}
