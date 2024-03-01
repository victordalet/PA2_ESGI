export default class ConnectionViewModel {

    openPopup = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateY(0)';
        }
    };

}
