export default class ReserveViewModel {

    public verifyDate = (dateStart: string, dateEnd: string) => {
        const dateStartValue = new Date(dateStart);
        const dateEndValue = new Date(dateEnd);
        if (dateStartValue < new Date()) {
            return dateStartValue < dateEndValue;
        }
        return false;
    };

    public openPopupBadDate = () => {
        const root = document.querySelector<HTMLElement>('.pop-up');
        if (root) {
            root.style.transform = 'translateX(0)';
        }
    };

    public openPopupNote = () => {
        const root = document.querySelectorAll<HTMLElement>('.pop-up');
        if (root) {
            root[1].style.transform = 'translateX(0)';
        }
    };

    public addService(index: number, id: number) {
        const service = document.querySelectorAll<HTMLElement>('.services-new .card');
        if (service) {
            if (service[index].classList.contains('active')) {
                service[index].classList.remove('active');
            } else {
                service[index].classList.add('active');
            }
        }
    }

}