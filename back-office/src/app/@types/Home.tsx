import React from 'react';

import ViewModel from '../view-models/Home';

export interface ViewProps {
    onInputChange: (
        name: string
    ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    addInput: string;
}
