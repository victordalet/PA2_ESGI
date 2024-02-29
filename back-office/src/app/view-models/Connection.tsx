export default class ConnectionViewModel {

    openPopup = () => {
        const root = document.querySelector<HTMLElement>('.bar');
        if (root) {
            root.style.transform = 'translateY(0)';
        }
    };

}
