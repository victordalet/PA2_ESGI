import {DataResponse} from "../@types/location";

export default class LocationViewModel {
    public searchFilter = (data: DataResponse[]) => {
        const input = document.querySelector<HTMLInputElement>("#search");
        const value = input?.value || "";
        return data.filter((d: DataResponse) => d.name.includes(value));
    };

    public capacityFilter = (data: DataResponse[]) => {
        const input = document.querySelector<HTMLInputElement>("#capacity");
        const value = input?.value || "";
        const valueNum = Number(value);
        return data.filter((d: DataResponse) => d.capacity > valueNum);
    };

    public priceFilter = (data: DataResponse[]) => {
        const input = document.querySelector<HTMLInputElement>("#price");
        const value = input?.value || "";
        const valueMax = Number(value);
        return data.filter((d: DataResponse) => d.price > valueMax);
    };
}
