export class ResourcesModel {


    public fetchServices = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const response = await fetch(`${apiPath}/service/service-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

    public fetchLocation = async () => {
        const apiPath = process.env.API_HOST || 'http://localhost:3001';
        const responseLocation = await fetch(`${apiPath}/location/location-by-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await responseLocation.json();
    };
}