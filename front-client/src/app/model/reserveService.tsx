export class ReserveServiceModel {


    public fetchService = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(apiPath + '/service', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

    public isCreator = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(apiPath + '/user/token-to-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        const data: { email: string } = await response.json();
        return data;
    };


}