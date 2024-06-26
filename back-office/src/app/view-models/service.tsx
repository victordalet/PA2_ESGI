import {resultData} from "../@types/service";

export default class ServiceViewModel {
    public searchFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#search");
        const value = input?.value || "";
        return data.filter((d: resultData) => d.name.includes(value));
    };

    public priceFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#budget");
        const value = input?.value || "";
        const valueNum = Number(value);
        return data.filter((d: resultData) => d.price > parseInt(value));
    };

    public isValidateFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#is_valid");
        if (input?.checked) {
            return data.filter((d: resultData) => d.is_valid === 0);
        }
        return data;
    };
}