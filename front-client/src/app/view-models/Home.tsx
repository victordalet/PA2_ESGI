export default class HomeViewModel {

    animationStart = () => {
        setTimeout(() => {
                const title = document.querySelector<HTMLElement>('.home-page h1');
                if (title) {
                    title.style.transform = 'translateY(0)';
                }
            }
            , 500);
    };

}
