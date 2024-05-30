export class ResourcesModel {


    public fetchServices = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/service/service-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };
}