import React from 'react';

import ViewModel from '../view-models/Home';

export interface ViewProps {
    stats: StatsUser;
    data: StatsData[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    addInput: string;
    stats: StatsUser;
    data: StatsData[];
}


export interface StatsUser {
    nb_users: number;
    nb_remove_user: number;
    nb_premium: number;
    nb_users_created_this_week: number[];
    nb_services: number;
    nb_location: number;
    number_job: number;
    number_location_type: number;
}

export interface StatsData {
    name: string;
    number: number;
}