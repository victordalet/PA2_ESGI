import { resultData } from "../@types/service";

export default class ServiceViewModel {
    public searchFilter = (data: resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#search");
        const value = input?.value || "";
        return data.filter((d: resultData) => d.name.includes(value));
      };
    
    public priceFilter = (data:resultData[]) => {
        const input = document.querySelector<HTMLInputElement>("#price");
        const value = input?.value || "";
        const valueNum = Number(value);
        return data.filter((d:resultData) => d.price === valueNum);
    };
}