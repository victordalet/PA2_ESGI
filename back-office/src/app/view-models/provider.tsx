import {ProviderInfoTable, UserRequest} from "../@types/provider";

export default class ProviderViewModel {

    public getSpeedRoco(user: UserRequest[], provider: ProviderInfoTable[]): any[] {
        const response: any[] = [];
        user.map((u) => {
            provider.map((provider) => {
                console.log(u.description.toLowerCase(), "aaaa", provider.name.toLowerCase());
                if (u.city.toLowerCase().includes(provider.city.toLowerCase())
                    && provider.name.toLowerCase().includes(u.service_name.toLowerCase())) {
                    response.push({
                        user: `${u.user_email} ( ${u.service_name} ) `,
                        provider: `${provider.created_by} (${provider.name})`
                    });
                }
            });
        });
        return response;
    }

}