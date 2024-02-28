import ViewModel from '../view-models/language';

export interface ViewProps {
    postFile: (file: File) => void;
}

export interface ControllerProps {
    viewModel: ViewModel;
}
