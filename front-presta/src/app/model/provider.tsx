export class ProviderModel {

    public fetchService = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(apiPath + '/service/get-service-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                service_id: document.location.href.split('id=')[1]
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

}