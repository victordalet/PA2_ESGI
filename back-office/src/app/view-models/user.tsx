import {resultData} from "../@types/user";

export default class UserViewModel {
    public searchFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#search");
        const value = input?.value || "";
        return data.filter((d: resultData) => d.email.includes(value));
    };

    public ruleFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>('#role');
        const value = input?.value || "";
        return data.filter((d: resultData) => d.rules.includes(value));
    };

    public isPremiumFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#premium");
        const value = input?.checked || false;
        return data.filter((d: resultData) => d.premium === value.toString());
    };

}
