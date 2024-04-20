import ViewModel from '../view-models/provider';

export interface ViewProps {
    eventCalendar: EventCalendar[];
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    eventCalendar: EventCalendar[];
}

export interface EventCalendar {
    start: string;
    end: string;
    title: string;
}

