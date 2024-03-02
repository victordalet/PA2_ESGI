export default class SignViewModels {
    openPopup = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateX(0)';
        }
    };

    isGoodPassword = (password: string, confirmPassword: string) => {
        if (password.length < 8) {
            return false;
        }
        return password === confirmPassword;
    };

    FieldIsEmpty = (email: string, password: string, confirmPassword: string) => {
        return email === '' || password === '' || confirmPassword === '';
    };

    isGoodEmail = (email: string) => {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return reg.test(email);
    };

}