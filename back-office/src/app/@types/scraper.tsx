import ViewModel from '../view-models/scraper';

export interface ViewProps {
    types: string[];
    scrape: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}

export interface ControllerState {
    types: string[];
}
