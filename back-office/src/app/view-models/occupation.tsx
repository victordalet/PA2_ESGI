export default class OccupationViewModel {

    public launchPopUpState = (from: string, to: string, location_occupation_id: number, email: string, name: string) => {
        window.localStorage.setItem('location_occupation_id', location_occupation_id.toString());
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('name', name);
        const popUPElement = document.querySelector('.container-state') as HTMLElement;
        popUPElement.classList.add('active');
        const inputStateTime = document.querySelector<HTMLInputElement>('#input-start-time');
        if (!inputStateTime) {
            return;
        }
        inputStateTime.value = from.split('T')[0];
        const inputEndTime = document.querySelector<HTMLInputElement>('#input-end-time');
        if (!inputEndTime) {
            return;
        }
        inputEndTime.value = to.split('T')[0];
    };

    public closePopUpState = () => {
        const popUPElement = document.querySelector('.container-state') as HTMLElement;
        popUPElement.classList.remove('active');
    };

}