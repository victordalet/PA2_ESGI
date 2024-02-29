import ViewModel from '../view-models/language';

export interface ViewProps {
    postFile: () => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}
