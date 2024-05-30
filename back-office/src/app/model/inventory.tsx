import {LocationAvailability} from "../@types/occupation";

export class InventoryModel {

    public getInventory = async (): Promise<LocationAvailability[]> => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/occupation-info-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

}