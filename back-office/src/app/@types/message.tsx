import ViewModel from '../view-models/message';
import React from "react";

export interface ViewProps {
    onInputChange: (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    addIllegibleMessage: () => void;
    data: ResponseIllegibleMessage[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    addInput: string;
    data: ResponseIllegibleMessage[];
}


export interface ResponseIllegibleMessage {
    created_by: string;
    nb_illegible_words: number;
}