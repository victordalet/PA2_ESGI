import {FormLocation} from "../@types/location";

export default class LocationViewModel {

    public storeFormInJSON(): FormLocation {
        let typeConcierge = '';
        Array.from(Array(4).keys()).map((i) => {
            const ele = document.querySelector<HTMLInputElement>('#conciergerie' + i);
            if (ele && ele.checked) {
                typeConcierge = ele.value;
            }
        });
        const time: number[] = [];
        Array.from(Array(5).keys()).map((i) => {
            const ele = document.querySelector<HTMLInputElement>('#contact' + i);
            if (ele && ele.checked) {
                time.push(i);
            }
        });


        return {
            typeConcierge: typeConcierge,
            address: document.querySelector<HTMLInputElement>('#address')?.value || '',
            country: document.querySelector<HTMLSelectElement>('#country')?.value || '',
            type: document.querySelector<HTMLSelectElement>('#type')?.value || '',
            typeLocation: document.querySelector<HTMLSelectElement>('#rent')?.value || '',
            numberRoom: parseInt(document.querySelector<HTMLSelectElement>('#room')?.value || '0') || 0,
            surface: 0,
            nameFounder: document.querySelector<HTMLInputElement>('#name')?.value || '',
            email: document.querySelector<HTMLInputElement>('#email')?.value || '',
            telephone: document.querySelector<HTMLInputElement>('#phone')?.value || '',
            time: time,
            service: []
        };
    }

    public resetChoiceConcierge(numberSelected: number) {
        Array.from(Array(4).keys()).map((i) => {
            if (i !== numberSelected) {
                const element = document.querySelector<HTMLInputElement>('#conciergerie' + i);
                if (element) {
                    element.checked = false;
                }
            }
        });
    }


    public allSelectedRadioContact() {
        Array.from(Array(5).keys()).map((i) => {
            const element = document.querySelector<HTMLInputElement>('#contact' + i);
            if (element) {
                element.checked = true;
            }
        });
    }

}