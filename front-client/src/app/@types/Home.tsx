import React from 'react';

import ViewModel from '../view-models/Home';

export interface ViewProps {
    service: ServiceResponse[];
    location: LocationResponse[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    service: ServiceResponse[];
    location: LocationResponse[];
}


export interface ServiceResponse {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    nb_use?: number;
}

export interface LocationResponse {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by?: string;
    name: string;
    picture?: string;
    description: string;
    accepted?: boolean;
    address: string;
    latitude: number;
    longitude: number;
    capacity: number;
    price: number;
    type: string;
    is_occupy_by?: string;
}