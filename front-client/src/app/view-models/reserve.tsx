export default class ReserveViewModel {

    public verifyDate = (dateStart: string, dateEnd: string) => {
        const dateStartValue = new Date(dateStart);
        const dateEndValue = new Date(dateEnd);
        if (dateStartValue < new Date()) {
            return dateStartValue < dateEndValue;
        }
        return false;
    };

    openPopupBadDate = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateX(0)';
        }
    };

}