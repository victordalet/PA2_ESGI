export default class ConnectionViewModel {

    openPopup = (index: number) => {
        const root = document.querySelectorAll<HTMLElement>('.pop-up');
        if (root) {
            root[index].style.transform = 'translateX(0)';
        }
    };


}
