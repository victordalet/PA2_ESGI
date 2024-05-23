import {LocationAvailability} from "../@types/occupation";

export class InventoryModel {

    public getInventory = async (): Promise<LocationAvailability[]> => {
        const apiPath = process.env.API_PATH || 'http://localhost:3001';
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