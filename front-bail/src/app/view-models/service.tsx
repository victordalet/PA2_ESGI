export default class ServiceViewModel {

    openPopupError = () => {
        const popup = document.querySelector<HTMLElement>(".pop-up");
        if (popup) {
            popup.style.transform = "translateX(0)";
        }
    };

}