export default class HomeViewModel {

    animationStart = () => {
        setTimeout(() => {
                const stats = document.querySelectorAll<HTMLElement>('.bar');
                stats.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            , 100);
    }

}
