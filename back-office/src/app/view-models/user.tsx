import { resultData } from "../@types/user";

export default class UserViewModel {
  public searchFilter = (data: resultData[]) => {
    const input = document.querySelector<HTMLInputElement>("#search");
    const value = input?.value || "";
    return data.filter((d: resultData) => d.email.includes(value));
  };
}
