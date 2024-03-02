export default class SettingsViewModels {
    openPopup = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateX(0)';
        }
    };

    openPopupSuccess = () => {
        const root = document.querySelectorAll<HTMLElement>('.pop-up');
        if (root) {
            root[1].style.transform = 'translateX(0)';
        }
    };

    isGoodPassword = (password: string, confirmPassword: string) => {
        if (password.length < 8) {
            return false;
        }
        return password === confirmPassword;
    };

}