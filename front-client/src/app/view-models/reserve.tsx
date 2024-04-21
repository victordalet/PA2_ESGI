export default class ReserveViewModel {

    public verifyDate = (dateStart: string, dateEnd: string) => {
        const date = new Date();
        const dateNow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        return dateStart < dateNow || dateEnd < dateNow;

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