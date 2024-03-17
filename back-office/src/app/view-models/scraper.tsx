export default class ScraperViewModel {

    openPopup = (index: number) => {
        const root = document.querySelectorAll<HTMLElement>('.pop-up');
        if (root) {
            root[index].style.transform = 'translateY(0)';
        }
    };


}