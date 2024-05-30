
export default class ProviderModel {



    public fetchService = async () => {
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        const response = await fetch(apiPath + '/job', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };

    public getLocationsOccupationAdminInfo = async () => {
        const apiPath = process.env.API_PATH || 'https://apipcs.c2smr.fr';
        const response = await fetch(`${apiPath}/location/occupation-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            }
        });
        return await response.json();
    };


    public reservedService = async () => {
        const locationOccupationId = (document.getElementById('location-occupation') as HTMLSelectElement).value;
        const serviceId = (document.getElementById('service-provider-select') as HTMLSelectElement).value;
        const fromDatetime = (document.getElementById('from-datetime') as HTMLSelectElement).value;
        const toDatetime = (document.getElementById('to-datetime') as HTMLSelectElement).value;
        const apiPath = process.env.API_HOST || 'https://apipcs.c2smr.fr';
        await fetch(apiPath + '/service/service-by-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token') || ''
            },
            body: JSON.stringify({
                location_occupation_id: locationOccupationId,
                service_id: serviceId,
                from_datetime: fromDatetime,
                to_datetime: toDatetime
            })
        });
        document.location.reload();
    };

    public getProvider = async () => {
        const apiPath = process.env.API_HOST || "https://apipcs.c2smr.fr";
        const response = await fetch(apiPath + "/service", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
        });
        return await response.json();
    };

}