import {FormLocation} from "../@types/location";

export default class LocationViewModel {

    private modifyColorTitleBox = (title1: boolean, title2: boolean, title3: boolean) => {
        const titles = document.querySelectorAll<HTMLElement>('.opener h2');
        const colorTrue = '#0f5b06';
        const colorFalse = '#9f0814';
        titles[0].style.color = title1 ? colorTrue : colorFalse;
        titles[1].style.color = title2 ? colorTrue : colorFalse;
        titles[2].style.color = title3 ? colorTrue : colorFalse;

    };

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


        const data = {
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
            privacy: document.querySelector<HTMLInputElement>('#privacy')?.checked || false,
            description: document.querySelector<HTMLInputElement>('#description')?.value || ''
        };

        if (data.address === '' || data.country === '' || data.type === '' || data.typeLocation === '' ||
            data.nameFounder === '' || data.email === '' || data.telephone === '' || !data.privacy) {
            this.modifyColorTitleBox(false, true, true);
            if (data.description === '') {
                this.modifyColorTitleBox(false, true, false);
            }
            this.openPopupError();
            return {
                typeConcierge: '',
                address: '',
                country: '',
                type: '',
                typeLocation: '',
                numberRoom: 0,
                surface: 0,
                nameFounder: '',
                email: '',
                telephone: '',
                time: [],
                description: ''
            };
        }

        return data;


    }

    private calculatePrice = () => {
        let price = 0;
        const typeLocation = document.querySelector<HTMLSelectElement>('#rent')?.value;
        const numberRoom = parseInt(document.querySelector<HTMLSelectElement>('#room')?.value || '0') || 0;
        if (typeLocation === 'house') {
            price = 100 * numberRoom;
        } else if (typeLocation === 'flat') {
            price = 50 * numberRoom;
        }
        return price;
    };

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

    public changeStyleCardSelected = (index: number) => {
        const elements = document.querySelectorAll<HTMLElement>('.icon-type-location');
        console.log(elements);
        console.log(index);
        const element = elements[index];
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    };


    public allSelectedRadioContact() {
        Array.from(Array(5).keys()).map((i) => {
            const element = document.querySelector<HTMLInputElement>('#contact' + i);
            if (element) {
                element.checked = true;
            }
        });
    }

    public activeStep2 = () => {
        const price = this.calculatePrice();
        const inputPrice = document.querySelector<HTMLInputElement>("#price");
        if (inputPrice) {
            inputPrice.value = price.toString();
        }

    };

    public openPopupError = () => {
        const popup = document.querySelector<HTMLElement>(".pop-up");
        if (popup) {
            popup.style.transform = "translateX(0)";
        }
    };


    public openOrCloseOpener = (index: number) => {
        const openers = document.querySelectorAll<HTMLElement>(".close-or-open");
        const icons = document.querySelectorAll<HTMLElement>('.opener i');
        const icon = icons[index];
        const opener = openers[index];
        if (opener) {
            if (opener.style.display === "none") {
                opener.style.display = "block";
                icon.style.transform = 'rotate(180deg)';
            } else {
                opener.style.display = "none";
                icon.style.transform = 'rotate(0)';
            }
        }
    };

}