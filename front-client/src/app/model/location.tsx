import {locationType} from "../@types/Home";

export class LocationModel {

    public fetchLocation = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const res = await fetch(apiPath + "/location", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await res.json();
    };

    public getTypeLocation = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/type_location`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: locationType[] = await response.json();
        return data;
    };

}
