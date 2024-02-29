import React from 'react';

import ViewModel from '../view-models/Home';

export interface ViewProps {
    stats: StatsUser;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    addInput: string;
    stats: StatsUser;
}


export interface StatsUser {
    nb_users: number;
    nb_remove_user: number;
    nb_premium: number;
    nb_users_created_this_week: number[];
}