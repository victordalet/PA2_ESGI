export class ProviderModel {

    public fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service/get-service-by-user-v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                service_id: document.location.href.split('id=')[1],
                location_occupation_id: 0
            })
        });
        return await response.json();
    };

    public isYourService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const res = await fetch(`${apiPath}/service/your`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                id: document.location.href.split('id=')[1]
            })
        });
        const data: { accept: boolean } = await res.json();
        if (!data.accept) {
            document.location.href = "/resources";
        }
    };

    public addOccupation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        await fetch(apiPath + '/service/add-service-by-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                from: document.querySelector<HTMLInputElement>('#from')?.value,
                to: document.querySelector<HTMLInputElement>('#to')?.value,
                service_id: document.location.href.split('id=')[1]
            })
        });
        document.location.reload();

    };

}