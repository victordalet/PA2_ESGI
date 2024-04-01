import ViewModel from "../view-models/Connection";
import React from "react";

export interface ViewProps {
    testLogin: () => void;
    onInputChange: (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    askBail: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    email: string;
    password: string;
}

export interface dataConnection {
    connection: string | null;
}