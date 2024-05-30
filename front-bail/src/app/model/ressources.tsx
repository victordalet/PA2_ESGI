export class ResourcesModel {


    public fetchLocation = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const responseLocation = await fetch(`${apiPath}/location/location-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await responseLocation.json();
    };

    public payLocation = async (id: number) => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/location-paiement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: id
            })
        });
        const data = await response.json();
        window.open(data.url, '_blank');
    };
}