export default class PremiumViewModel {

    openPopup = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateX(0)';
        }
    };

}