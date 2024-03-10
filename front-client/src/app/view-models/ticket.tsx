export default class TicketViewModel {
    public openPopup = (index: number) => {
        const root = document.querySelectorAll<HTMLElement>('.pop-up');
        if (root) {
            root[index].style.transform = 'translateX(0)';
        }
    };
}